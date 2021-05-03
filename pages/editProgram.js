import React from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "../styles/EditProgram.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import GenInfo from "../components/editProgram/GenInfo";
import DomainInput from "../components/editProgram/DomainInput";
import Master from "../components/editProgram/Mastery";
import Behavior from "../components/editProgram/Behavior";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Current from "../components/editProgram/Current";
import Mastered from "../components/editProgram/Mastered";

const editProgram = ({ studentID }) => {

  
  //Allows for the user to switch from mastered to unmastered criteria.
  const [page, setPage] = React.useState(0);
  //Changes pages
  const handlePageChange = (event, newValue) => {
    console.log(newValue);
    setPage(newValue);
  };
  return (
    <div>
      <Head>
        <title>Edit Program</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>
      <Navbar pageTitle="Edit Program">
      <div className= {styles.topMenu}>
          <Paper square>
            <Tabs
              value={page}
              onChange={handlePageChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Current" />
              <Tab label="Mastered" />
            </Tabs>
          </Paper>
        </div>
        
        {page === 0 ? (
          <Current studentID={studentID} />
        ) : (
          <Mastered studentID={studentID} />
        )}
      </Navbar>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      studentID: query.studentID,
    },
  };
};

export default editProgram;
