import styles from "../styles/StudentSearch.module.css";
import Link from "next/link";
import SearchList from "../components/SearchList";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const buttonColor = "#0F5787";

export default function EmployeeSearch({ employees }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
    <Head>
      <title>Employee Search</title>
      <link rel="icon" href="/atc-logo.png" />
    </Head>

    <Navbar pageTitle="Employee Search">
      <div className={styles.searchPage}>
        <FormControl>
          <TextField
            className={styles.searchBox}
            id="outlined-basic"
            label="Employee Search"
            variant="outlined"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </FormControl>

        <div>
          <SearchList students={employees} searchTerm={searchTerm} />
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/newStudent">
            <Button className="primaryButton">Add New</Button>
          </Link>
        </div>
      </div>
    </Navbar>
  </div>
  );
}

export const getServerSideProps = async () => {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  // // const res = await fetch(`https://randomuser.me/api/`)
  // const Employees = await res.json()

  const employees = [
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

  employees.sort(function (a, b) {
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
      employees,
    },
  };
};
