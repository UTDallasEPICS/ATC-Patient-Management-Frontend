import React, { useState } from "react";
import { OutlinedInput, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@mui/material';
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Avatar from "../../components/Avatar";
import styles from "../../styles/EmployeeProfile.module.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "next/link";
import CheckUser  from '../../auth0CheckUser';

const employeeProfile = ({students, employee, currentStudent}) => {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin"])
  if(!allowed) return(<div>Redirecting...</div>);

  // prevents current students from being null, which causes HELLA erorros
  currentStudent = (currentStudent[0] == null) ? [] : currentStudent

  //State handles the notifications for when the archive is clicked
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //State that handles opening the list of students so that an administrator can assign students to certain employees
  const [listOpen, setListOpen] = React.useState(false);
  const openList = () => {
    setListOpen(true);
  };
  const closeList = () => {
    setListOpen(false);
  };

  //State that handles the checking and unchecking of students within the list.
  //const classes = useStyles();

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.id - 1);
    const newChecked = [...checked];
    

    if (currentIndex === -1) {
      
      newChecked.push(value.id - 1);
      
    } else {
      console.log("hello from inside else");
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //state for handling submit button
  const [submitCheckOpen, setSubmitCheckOpen] = React.useState(false);

  //Opens the verification on saving student access
  const openSubmitCheck = () => {
    setSubmitCheckOpen(true);
  };
  //When save it closes both the alert and the list
  const closeSubmitCheckSave = () => {
    setSubmitCheckOpen(false);
    setListOpen(false);
  };
  //On no save it closes just the alert
  const closeSubmitCheckNoSave = () => {
    setSubmitCheckOpen(false);
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

  //State for handling when the x button is pressed on list
  const [xValidation, setXValidation] = React.useState(false);
  //Opens x validation
  const openXValidation = () => {
    setXValidation(true);
  };
  //Closes x validation
  const closeXValidation = () => {
    setXValidation(false);
  };
  //close x validation when user says yes
  //Closes x validation
  const closeXValidationYes = () => {
    setXValidation(false);
    setListOpen(false);
  };

  const formatDate = (d) => {
    return d.toLocaleDateString('en-us', { year:"numeric", month:"short", day: 'numeric'})
    //return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const handleArchive = async() => {
    const response = await fetch(`http://localhost:8080/employee/${employee._id}`, {
      method: "DELETE"
    })
    const data = await response.json()
    console.log(data)
    handleClose()
  }

  /*
    --------------------------
    For Updating Student Access
    --------------------------
  */ 
  const [selectedStudents, setSelectedStudents] = useState(currentStudent);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCancelDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveStudents = async () => {
    const response = await fetch(`http://localhost:8080/employee/${employee._id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patients: selectedStudents
      }),
    })
    const data = await response.json()
    console.log(data)
    setDialogOpen(false);
  }

  // is attached to Select, value contains all salected content in Select
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;

    //console.log(selectedStudents)

    // checks for duplicates
    var distinctStudents = new Set();
    var duplicates = false;
    for (const selectedStudent of value) {
      if(distinctStudents.has(selectedStudent._id)) {
        distinctStudents.delete(selectedStudent._id)
        duplicates = true
      }
      else {
        distinctStudents.add(selectedStudent._id)
      }
    }

    // removes the duplicated from the selection
    if(duplicates) {
      var newSelection = []
      for (const selectedStudent of value) {
        if (distinctStudents.has(selectedStudent._id))
        newSelection.push(selectedStudent)
      }
      console.log(newSelection)
      setSelectedStudents(newSelection);
    }
    else {
      setSelectedStudents(value);
    }
  };

  /*
    ----------------------
    React Component Begins
    ----------------------
  */
  return (
    <div>
      <Head>
        <title>Employee Profile</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>
      

      <Navbar pageTitle="Employee Profile" role={role}>
        <Link href="/employee/search">
          <Button>Go Back</Button>
        </Link>
        <div className={styles.picture}>
          <Avatar diameter="175px" img={employee.img} />
        </div>
        <h1 className={styles.info}>
          {employee.firstName} {employee.lastName}
        </h1>
        <div className={styles.bg}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenDialog}
            className={styles.buttonGroup}
          >
            Update Student Access
          </Button>

          { /*
            This Dialog box is the check list of students 
          */}

          <Dialog disableEnforceFocus disableEscapeKeyDown open={dialogOpen} onClose={handleCancelDialog}>
            <DialogTitle>Update Student Access</DialogTitle>
            <DialogContent>
              <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                  multiple
                  value={selectedStudents}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (selected.map((student) => {
                    try {
                      return (`${student.firstName} ${student.lastName}`)
                    }
                    catch (err) {
                      console.log(err.message)
                      return '';
                    }
                  }).join(', '))}
                  MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5 + 8,
                          width: 250,
                        },
                      },
                    }}
                >
                  {students.map((student) => {
                    const name = `${student.firstName} ${student.lastName}`
                    var checked = false
                    for(const selectedStudent of selectedStudents) 
                      if (selectedStudent._id == student._id) checked = true;
                    return(
                      <MenuItem style={{width: '100%',}} key={name} value={student}>
                        <Checkbox style={{color: '#105688'}} checked={checked} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDialog}>Cancel</Button>
              <Button onClick={handleSaveStudents}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
        <br />
        <Divider variant="middle" />
        <p className={styles.label}>Date of Birth:</p>{" "}
        <p className={styles.info}>
                        {" "}
                        {formatDate(new Date(employee.birthday))}
                    </p>
        <p className={styles.label}>Phone Number:</p>{" "}
        <p className={styles.info}> {`(${employee.phoneNumber.slice(0,3)}) ${employee.phoneNumber.slice(3,6)}-${employee.phoneNumber.slice(6,10)}`}</p>
        <p className={styles.label}>Email: </p>{" "}
        <p className={styles.info}> {employee.email}</p>
        <Divider variant="middle" />
        <p className={styles.label}>Other Info:</p>
        <div className={styles.bgOther}>
          <Button
            variant="outlined"
            color="primary"
            onClick={openOtherInfo}
            className={styles.buttonGroup}
          >
            Other Info
          </Button>
        </div>

        {/*
        <OtherInfo info = {props.employee.otherInfo}/> 
        */}

        <div className={styles.bg}>
          <Link href={{pathname:"/employee/edit", query: {employeeID: employee._id}}}>
            <Button className={styles.menuButtonGroup}>Edit</Button>
          </Link>
          <Button className={styles.menuButtonGroup} onClick={handleClickOpen}>
            Archive
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to archive this employee?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              When archiving an employee you will no longer be able to view any
              of the records of the employee. To regain access you will have to
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
              onClick={handleArchive}
              color="primary"
              autoFocus
              className={styles.buttonGroup}
            >
              <Link href="/employee/search">Yes</Link>
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={submitCheckOpen}
          onClose={closeSubmitCheckNoSave}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to make these changes?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This employee will now be able to access the records for all the
              checked students.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeSubmitCheckNoSave}
              color="primary"
              className={styles.buttonGroup}
            >
              No
            </Button>
            <Button
              onClick={closeSubmitCheckSave}
              color="primary"
              autoFocus
              className={styles.buttonGroup}
            >
              Yes
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
              {employee.otherInfo}
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
        <Dialog
          open={xValidation}
          onClose={closeXValidation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to exit list?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Without clicking save changes, no changes will be saved.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeXValidation}
              color="primary"
              autoFocus
              className={styles.buttonGroup}
            >
              No
            </Button>
            <Button
              onClick={closeXValidationYes}
              color="primary"
              autoFocus
              className={styles.buttonGroup}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Navbar>
    </div>
  );
};

export default employeeProfile;

export const getServerSideProps = async ({ query }) => {
  const allPatientsRes = await fetch(`http://localhost:8080/patient`);
  const allPatients = await allPatientsRes.json()

  const employeeID = query.id
  const employeeRes = await fetch(`http://localhost:8080/employee/${employeeID}`);
  const employee = await employeeRes.json()

  const { data: { patients},} = employee
  var currentStudents = []
  for(const patientID of patients) {
    const currentStudentRes = await fetch(`http://localhost:8080/patient/${patientID}`)
    const currentStudent = await currentStudentRes.json()
    currentStudents.push(currentStudent['data'])
  }

  return {
    props: {
      students: allPatients['data'],
      employee: employee['data'],
      currentStudent: currentStudents,
    }
  };
};