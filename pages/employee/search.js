import styles from "../../styles/SearchList.module.css";
import Link from "next/link";
import SearchList from "../../components/SearchList";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CheckUser  from '../../auth0CheckUser';

const buttonColor = "#0F5787";

export default function EmployeeSearch({ employees }) {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin"])
  if(!allowed) return(<div>Redirecting...</div>);

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Head>
        <title>Employee Search</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Employee Search" role={role}>
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
            <SearchList
              students={employees}
              searchTerm={searchTerm}
              destinationPath="/employee/profile"
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Link href="/employee/new">
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
  // const employees = await res.json()
  let temp = await fetch("http://localhost:8080/employee", {
      method: "get",
  });

  const { data } = await temp.json();

  let employees = data.map((employee) => {
    employee.id = employee._id;
      delete employee._id;
      return {
          ...employee,
          img: "",
      };
  });

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