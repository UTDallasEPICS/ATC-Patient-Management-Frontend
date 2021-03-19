import styles from "../styles/StudentSearch.module.css";
import Link from "next/link";
import StudentList from "../components/StudentList";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { green } from '@material-ui/core/colors';

import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function studentSearch({ students }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Search</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Student Search"></Navbar>

      <ThemeProvider theme={theme}>
        <TextField
          label="ThemeProvider"
          id="mui-theme-provider-standard-input"
        />
        <TextField
          label="ThemeProvider"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
        />
      </ThemeProvider>
      <div className={styles.studentSearchPage}>
        <TextField
          className={styles.searchBox}
          id="outlined-basic"
          label="Student Search"
          variant="outlined"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <div>
          <StudentList students={students} searchTerm={searchTerm} />
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/newStudent">
            <Button className="primaryButton">Add New</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  // // const res = await fetch(`https://randomuser.me/api/`)
  // const students = await res.json()

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
  ];

  students.sort(function (a, b) {
    const aName = a.firstName + a.lastName;
    const bName = b.firstName + b.lastName;
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      students,
    },
  };
};
