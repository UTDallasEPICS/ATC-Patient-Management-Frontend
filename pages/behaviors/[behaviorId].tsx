import Head from "next/head";
import { GetServerSideProps } from "next";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Button } from "@material-ui/core";
import CheckUser from "../../auth0CheckUser";

function BehaviorPage({ behaviorData: { data } }) {
    // Verifies if user has the correct permissions
    if(!CheckUser()) return(<div>Redirecting...</div>);
    
    return (
        <>
            <Head>
                <title>Behavior</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>
            <Navbar pageTitle={data.name}>
                <Link href="/manageBehaviors">
                    <Button variant="contained" color="secondary">
                        Back to Manage Behaviors
                    </Button>
                </Link>
                <div style={{ marginTop: "3rem" }}>
                    <h1>Behavior Name: {data.name}</h1>
                    <p>Description: {data.description}</p>
                    <p>Behavior Type: {data.datatype}</p>
                </div>
            </Navbar>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await fetch(
        `http://localhost:8080/behaviour/${context.params.behaviorId}`,
        {
            method: "get",
        }
    );
    const behaviorData = await data.json();
    return {
        props: {
            behaviorData,
        },
    };
};

export default BehaviorPage;
