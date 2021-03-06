import React from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Avatar from "../components/Avatar";
import OtherInfo from "../components/OtherInfo";
import styles from "../styles/StudentProfile.module.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "next/link";

const studentProfile = ({ student }) => {
  //State handles the notifications for when the archive is clicked
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //State for handling when other info is being pressed
  const [otherInfoOpen, setOtherInfo] = React.useState(false);
  //Opens other info
  const openOtherInfo = () => {
    setOtherInfo(true);
  };
  //Close Other Info
  const closeOtherInfo = () => {
    setOtherInfo(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Profile</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Student Profile">
        <div className={styles.profilePage}>
          <span className={styles.picture}>
            <Avatar diameter="175px" img={student.img} />
          </span>
          <h1 className={styles.info}>
            {student.firstName} {student.lastName}
          </h1>
          <div className={styles.bgOther}>
            <Link
              href={{
                pathname: "/addSession",
                query: { studentID: student.id },
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                className={styles.buttonGroup}
              >
                New Session
              </Button>
            </Link>
          </div>
          <br />
          <Divider variant="middle" />
          <p className={styles.label}>Date of Birth:</p>{" "}
          <p className={styles.info}> {student.dob}</p>
          <p className={styles.label}>Phone Number:</p>{" "}
          <p className={styles.info}> {student.phone}</p>
          <p className={styles.label}>Email: </p>{" "}
          <p className={styles.info}> {student.email}</p>
          <Divider variant="middle" />
          <p className={styles.label}>Other Info:</p>
          <div className={styles.bg}>
            <Button
              variant="outlined"
              color="primary"
              onClick={openOtherInfo}
              className={styles.buttonGroup}
            >
              Other Info
            </Button>
          </div>
          <div className={styles.bg}>
            <br />
            <Link
              href={{
                pathname: "/editStudent",
                query: { studentID: student.id },
              }}
            >
              <Button className={styles.buttonGroup1}>Edit</Button>
            </Link>
            <Link
              href={{
                pathname: "/editProgram",
                query: { studentID: student.id },
              }}
            >
              <Button className={styles.buttonGroup2}>Edit Program</Button>
            </Link>
            <br />

            <Button className={styles.buttonGroup1} onClick={handleClickOpen}>
              Archive
            </Button>
            <Link
              href={{
                pathname: "/analytics",
                query: { studentID: student.id },
              }}
            >
              <Button className={styles.buttonGroup2}>View Reports</Button>
            </Link>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to archive this student?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                When archiving a student you will no longer be able to view any
                of the records of the student. To regain access you will have to
                get access from an administrator.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="primary"
                className={styles.buttonGroup}
              >
                No
              </Button>
              <Button
                onClick={handleClose}
                color="primary"
                autoFocus
                className={styles.buttonGroup}
              >
                <Link href="/studentSearch">Yes</Link>
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={otherInfoOpen}
            onClose={closeOtherInfo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Other Info:"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {student.otherInfo}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={closeOtherInfo}
                color="primary"
                autoFocus
                className={styles.buttonGroup}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>{" "}
        <br />
      </Navbar>
    </div>
  );
};

export default studentProfile;

export const getServerSideProps = async ({ query }) => {
  const student = {
    id: query.id,
    firstName: "Billy",
    lastName: "Doe",
    img: "",
    dob: "December 15, 1422",
    phone: "999-999-9999",
    email: "epics@atc.com",
    otherInfo: "Parent Phone: 828-902-2828",
  };
  return {
    props: {
      student,
    },
  };
};
