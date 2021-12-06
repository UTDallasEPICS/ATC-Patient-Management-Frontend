import React from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Current from "../components/editProgram/Current";

const editProgram = ({ studentID, program }) => {
  return (
    <div>
      <Head>
        <title>Edit Program</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>
      <Navbar pageTitle="Edit Program">
        <Current addedBehavior={program.behaviours} studentID={studentID} />
      </Navbar>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const temp = await fetch(
    `http://localhost:8080/patient/program/${query.studentID}`
  );
  const { data } = await temp.json();
  return {
    props: {
      studentID: query.studentID,
      program: data[0],
    },
  };
};

export default editProgram;
