import React from 'react'
import Navbar from '../components/Navbar';
import Head from "next/head";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styles from "../styles/EditProgram.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from "@material-ui/core/Typography";




const editProgram = () => {
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

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
      return ['General Info', 'Domain', 'Mastery Criteria'];
    }

    //Returns the components corresponding to the step the user is on.
    function getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
          return 'Gen Info...';
        case 1:
          return 'Domain...';
        case 2:
          return 'MC...';
        default:
          return 'Unknown stepIndex';
      }
    }
    return (
        <div>
            <Head>
            <title>Edit Program</title>
            <link rel="icon" href="/atc-logo.png" />
        </Head>
            <Navbar pageTitle="Edit Program">
            
          <h1>Hello World</h1>
            

            
          <div className={styles.addButton} >
          <Fab aria-label="add" onClick={handleClickOpen} className="primaryButton">
            <AddIcon />
          </Fab>
          </div>
          
          
     

      <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Create Behavior"}
            </DialogTitle>
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
            <Typography >
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className=""
              >
                Back
              </Button>
              <Button  className="primaryColor" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Save" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              
              
            </DialogActions>
          </Dialog>


            </Navbar>
        </div>
    )
}

export default editProgram
