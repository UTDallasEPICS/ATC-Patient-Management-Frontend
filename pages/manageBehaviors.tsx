import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { GetServerSideProps } from "next";
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface Behavior {
    name: string;
    description: string;
    datatype: string;
    _id: string;
}

interface BehaviorAsProps {
    behaviorName: string;
    description: string;
    id: number;
    datatype: string;
    _id: string;
}

export default function manageBehaviorsPage({ behaviors }) {
    const [behaviorList, setBehaviorList] = useState<BehaviorAsProps[]>(
        behaviors.map((behavior: Behavior, idx: number) => ({
            behaviorName: behavior.name,
            description: behavior.description,
            datatype: behavior.datatype,
            id: idx + 1,
            _id: behavior._id,
        }))
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const [focusElement, setFocusElement] = useState(-1);

    const removeBehavior = async () => {
        await fetch(
            `http://localhost:8080/behaviour/${behaviorList[focusElement]._id}`,
            {
                method: "delete",
            }
        );
        setBehaviorList((prev) => {
            prev.splice(focusElement, 1);
            return prev;
        });
        setFocusElement(-1);
        setDialogOpen(false);
    };

    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>Manage Behavior</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>
            <Navbar pageTitle="Manage Behavior">
                <div
                    style={{
                        width: "100%",
                        marginBottom: "1.5rem",
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">
                                        Behavior Name
                                    </TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Data Type</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {behaviorList.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.behaviorName}
                                        </TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.datatype}</TableCell>
                                        <TableCell align="center">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                            >
                                                <Link
                                                    href={`/behaviors/${row._id}`}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Click to view details
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor:
                                                            "#ff604f",
                                                        color: "white",
                                                    }}
                                                    onClick={() => {
                                                        setFocusElement(
                                                            row.id - 1
                                                        );
                                                        setDialogOpen(true);
                                                    }}
                                                >
                                                    Remove Behavior
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                {/* Add dialog here */}
                <Dialog
                    open={dialogOpen}
                    onClose={() => {
                        setDialogOpen(false);
                        setFocusElement(-1);
                    }}
                >
                    <DialogTitle>Remove this behavior?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to remove this behavior?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setDialogOpen(false);
                                setFocusElement(-1);
                            }}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                removeBehavior();
                            }}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Link href="/addBehavior">
                    <Button variant="contained" color="primary">
                        Add Behavior
                    </Button>
                </Link>
            </Navbar>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await fetch("http://localhost:8080/behaviour/", {});
    const behaviors = await data.json();
    return {
        props: {
            behaviors: behaviors.data,
        },
    };
};
