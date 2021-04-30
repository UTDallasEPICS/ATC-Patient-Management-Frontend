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

const editProgram = ({studentID}) => {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [behavior, setBehavior] = React.useState([
    {
      id: 0,
      name: "Touch Knees",
      description: "Test if client is able to touch knees",
      type: "Trial",
      domain: ["Behaviors for Increase"],
      masteryCriteria: "5 consecutive days passed.",
    },
    {
      id: 1,
      name: "Eye Contact",
      description:
        "Make eye contact when name is called first with a visual cue, then without a visual cue",
      type: "probe",
      domain: ["Listener Reponding", "Visual Cues"],
      masteryCriteria: "2 consecutive days passed.",
    },
    {
      id: 2,
      name: "Responding to Name",
      description: "Reacts when name is called",
      type: "probe",
      domain: ["Listener Reponding"],
      masteryCriteria: "10 Sessions Passed",
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep + 1 === steps.length) {
      setActiveStep(0);
      handleClose();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //Gets the steps for the stepper
  function getSteps() {
    return ["General Info", "Domain", "Mastery Criteria"];
  }

  //Returns the components corresponding to the step the user is on.
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <GenInfo />;
      case 1:
        return <DomainInput />;
      case 2:
        return <Master />;
      default:
        return "Unknown stepIndex";
    }
  }
  return (
    <div>
      <Head>
        <title>Edit Program</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>
      <Navbar pageTitle="Edit Program">
        <Behavior list={behavior} />

        <div className={styles.addButton}>
          <Fab
            aria-label="add"
            onClick={handleClickOpen}
            className="primaryButton"
          >
            <AddIcon />
          </Fab>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Create Behavior"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  {}
                ) : (
                  <div>
                    <Typography>{getStepContent(activeStep)}</Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className=""
                      >
                        Back
                      </Button>
                      <Button className="primaryColor" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Save" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
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
