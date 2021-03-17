import React from 'react'
import Navbar from "../components/Navbar";
import Head from "next/head";
import Avatar from "../components/Avatar";
import styles from "../styles/EmployeeProfile.module.css"
import Divider from '@material-ui/core/Divider';
import OtherInfo from "../components/OtherInfo"; 
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";


const employeeProfile = (props) => {

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
    }
    const closeList = () => {
        setListOpen(false); 
    }

    //State that handles the checking and unchecking of students within the list. 
    //const classes = useStyles();

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.id-1);
    const newChecked = [...checked];
    //console.log("hello"); 
    //console.log(value)
    //console.log(checked.indexOf(value.id-1));

    if (currentIndex === -1) {
      //console.log("hello from inside if");
      newChecked.push(value.id -1);
      //console.log(checked);
    } 
    else {
      console.log("hello from inside else");
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

   
   
    return (
        <div>
            <Head>
                <title>Employee Profile</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>

            <Navbar pageTitle="Employee Profile"/>

            <div className={styles.picture}>
                <Avatar diameter= "175px" img = {props.employee.img}/>
            </div>
            <h1 className = {styles.info}>{props.employee.firstName} {props.employee.lastName}</h1> 

        <div className={styles.bg}>
            <Button variant="outlined" color="primary" onClick={openList} className={styles.buttonGroup}>
            Update Student Access
            </Button>
      <Dialog onClose={closeList} aria-labelledby="customized-dialog-title" open={listOpen}>
            <DialogTitle id="customized-dialog-title" onClose={closeList}>
                Student List
                <IconButton aria-label="close"  onClick={closeList} className={styles.closeButton}>
                    <CloseIcon />
                </IconButton>
             </DialogTitle>
            
            <DialogContent dividers>
     <List >
      {props.students.map((index) => {
        const labelId = `checkbox-list-label-${index.id-1}`;

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
                checked={checked.indexOf(index.id-1) !== -1}
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
              <IconButton edge="end" aria-label="comments">
                
              </IconButton>
            </ListItemSecondaryAction>
            </ListItem>
                );
            })}
            </List>
                </DialogContent>
                <DialogActions>
                </DialogActions>
        </Dialog>
    </div>
            <br/>
            <Divider variant="middle" /> 
            <p className = {styles.label}>Date of Birth:</p> <p className = {styles.info}> {props.employee.dob}</p> 
            <p className = {styles.label}>Phone Number:</p> <p className = {styles.info}>  {props.employee.phone}</p> 
            <p className = {styles.label}>Email: </p> <p className = {styles.info}> {props.employee.email}</p>
            <Divider variant="middle" />

            <p className = {styles.label}>Other Info:</p>
            <OtherInfo info = {props.employee.otherInfo}/>


            <div className ={styles.bg}>
            
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button className= {styles.buttonGroup}>Edit</Button>
                <Button className= {styles.buttonGroup} onClick={handleClickOpen}>Archive</Button>
            </ButtonGroup>
            </div>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to archive this student?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When archiving an employee you will no longer be able to view any of the records of the employee. To regain access you will have to get access from an administrator.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" className={styles.buttonGroup}>
            No
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus className={styles.buttonGroup}>
            <Link href="/studentSearch">
            Yes
            </Link>
          </Button>
        </DialogActions>
      </Dialog>



            


            
        </div>
    )
}

export default employeeProfile


export const getServerSideProps = async () => {
    const employee = {
        id: 1,
        firstName: "Billy",
        lastName: "Doe",
        img: "", 
        dob: "December 15, 1422",
        phone: "999-999-9999", 
        email: "epics@atc.com",
        otherInfo: "Unable to work on Fridays"
      }

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
            id:16,
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