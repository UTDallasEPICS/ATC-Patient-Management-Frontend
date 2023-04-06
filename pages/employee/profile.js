import React from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Avatar from "../../components/Avatar";
import styles from "../../styles/EmployeeProfile.module.css";
import Divider from "@material-ui/core/Divider";
import OtherInfo from "../../components/OtherInfo";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckUser  from '../../auth0CheckUser';


const employeeProfile = ({ employee, students }) => {
  // Verifies if user has the correct permissions
  if(!CheckUser()) return(<div>Redirecting...</div>);

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
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };


  return (
    <div>
      <Head>
        <title>Employee Profile</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>
      

      <Navbar pageTitle="Employee Profile">
        <Link href="/employeeSearch">
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
            onClick={openList}
            className={styles.buttonGroup}
          >
            Update Student Access
          </Button>
          { /*This Dialog box is the check list of students */}
          <Dialog
            onClose={closeList}
            aria-labelledby="customized-dialog-title"
            open={listOpen}
          >
            <DialogTitle id="customized-dialog-title" onClose={closeList}>
              Student List
              <IconButton
                aria-label="close"
                onClick={openXValidation}
                className={styles.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <List>
                {students.map((index) => {
                  const labelId = `checkbox-list-label-${index.id - 1}`;

                  return (
                    <ListItem
                      key={index.id}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggle(index)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(index.id - 1) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                          className={styles.buttonGroup}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={` ${index.firstName} ${index.lastName}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                        ></IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                className={styles.buttonGroup}
                autoFocus
                onClick={openSubmitCheck}
                color="primary"
              >
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <br />
        <Divider variant="middle" />
        <p className={styles.label}>Date of Birth:</p>{" "}
        <p className={styles.info}>
                        {" "}
                        {formatDate(new Date(employee.dob))}
                    </p>
        <p className={styles.label}>Phone Number:</p>{" "}
        <p className={styles.info}> {employee.phone}</p>
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
        {/*<OtherInfo info = {props.employee.otherInfo}/> */}
        <div className={styles.bg}>
          <Link href={{pathname:"/editEmployee", query: {employeeID: employee.id}}}>
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
  const temp = await fetch(`http://localhost:8080/therapist/${query.id}`, {
        method: "get",
    });
    console.log( temp );
  const { data } = await temp.json();
  const temp2 = await fetch(`http://localhost:8080/patient/${query.id2}`, {
        method: "get",
    });
    console.log( temp2 );
  const { data2 } = await temp2.json();
  
  const employee = {
    id: query.id,
    firstName: data.firstName,
    lastName: data.lastName,
    img: "",
    dob: data.birthday,
    phone: data.phoneNumber,
    email: data.email,
    otherInfo: data.otherInfo,
  };
  
  const students1 = {
    id: query.id,
    firstName: data.firstName,
    lastName: data.lastName,
    img: "",
  };
  
  const students = [
    {
      id: 1,
      firstName: "Billy",
      lastName: "Doe",
      img: "",
    },
    {
      id: 2,
      firstName: "Alison",
      lastName: "Cooper",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      firstName: "Johnny",
      lastName: "Lennon",
      img: "https://picsum.photos/200",
    },
    {
      id: 4,
      firstName: "Lily",
      lastName: "Marshall",
    },
    {
      id: 5,
      firstName: "Alice",
      lastName: "Marshall",
    },
    {
      id: 6,
      firstName: "Lily",
      lastName: "Cooper",
    },
    {
      id: 7,
      firstName: "Billie",
      lastName: "Doe",
    },
    {
      id: 8,
      firstName: "Billy",
      lastName: "Elrond",
    },
    {
      id: 9,
      firstName: "Lily",
      lastName: "Marshall",
    },
    {
      id: 10,
      firstName: "Billy",
      lastName: "Doe",
      img: "",
    },
    {
      id: 11,
      firstName: "Alison",
      lastName: "Cooper",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 12,
      firstName: "Johnny",
      lastName: "Lennon",
      img: "https://picsum.photos/200",
    },
    {
      id: 13,
      firstName: "Lily",
      lastName: "Marshall",
    },
    {
      id: 14,
      firstName: "Alice",
      lastName: "Marshall",
    },
    {
      id: 15,
      firstName: "Lily",
      lastName: "Cooper",
    },
    {
      id: 16,
      firstName: "Billie",
      lastName: "Doe",
    },
    {
      id: 17,
      firstName: "Billy",
      lastName: "Elrond",
    },
    {
      id: 18,
      firstName: "Lily",
      lastName: "Marshall",
    },
  ];
  return {
    props: {
      employee,
      students,
    },
  };
};
