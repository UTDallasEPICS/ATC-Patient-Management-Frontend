import styles from "../styles/EmployeeSearch.module.css";
import Link from "next/link";
import EmployeeList from "../components/EmployeeList";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";

const buttonColor = "#0F5787";

export default function EmployeeSearch({ Employee }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Employee Search</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Employee Search"></Navbar>

      <div className={styles.EmployeeSearchPage}>
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search Employee..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <div>
          <EmployeeList Employees={Employees} searchTerm={searchTerm} />
        </div>

        <Link href="/newEmployee">
          <button
            className={styles.button}
            style={{ backgroundColor: buttonColor }}
          >
            Add New
          </button>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  // // const res = await fetch(`https://randomuser.me/api/`)
  // const Employees = await res.json()

  const Employees = [
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

  Employees.sort(function (a, b) {
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
      Employees,
    },
  };
};
