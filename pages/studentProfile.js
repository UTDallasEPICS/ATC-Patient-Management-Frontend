import React from 'react'
import Navbar from "../components/Navbar";
import Head from "next/head";
import Avatar from "../components/Avatar";
import OtherInfo from "../components/OtherInfo"; 
import styles from "../styles/StudentProfile.module.css"
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';


const studentProfile = ({ student }) => {
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Student Profile</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>

            <Navbar pageTitle="Student Profile" />
            <div className = {styles.profilePage}>
            <span className = {styles.picture}>
            <Avatar diameter= "175px" img = {student.img}/>
            </span>
            <h1 className = {styles.info}>{student.firstName} {student.lastName}</h1> 
            <Divider variant="middle" />
            <p className = {styles.label}>Date of Birth:</p> <p className = {styles.info}> {student.dob}</p> 
            <p className = {styles.label}>Phone Number:</p> <p className = {styles.info}>  {student.phone}</p> 
            <p className = {styles.label}>Email: </p> <p className = {styles.info}> {student.email}</p>
            <Divider variant="middle" />
            <p className = {styles.label}>Other Info:</p>
            <OtherInfo info = {student.otherInfo}/>
            <div className ={styles.bg}>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button >Edit</Button>
                <Button >New Session</Button>
                <Button >View Reports</Button> 
                <Button >Archive</Button>
            </ButtonGroup>
            </div>
           
            <div className = {styles.buttonGrid}>
                <button className={styles.btn}>Edit</button>
                <button className={styles.btn} >Archive</button> <br/>
            </div> 
            <div className = {styles.buttonGrid2}>
                <button className={styles.btn} >New Session</button> 
                
                <button className={styles.btn} >View Reports</button>
                </div> <br/>
            
            
            </div> <br/>
            
        </div>
    )
}

export default studentProfile


export const getServerSideProps = async () => {
    const student = {
        id: 1,
        firstName: "Billy",
        lastName: "Doe",
        img: "", 
        dob: "December 15, 1422",
        phone: "999-999-9999", 
        email: "epics@atc.com",
        otherInfo: "Parent Phone: 828-902-2828"
      }
      return {
        props: {
          student,
        },
      };
}; 