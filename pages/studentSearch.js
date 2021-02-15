import styles from "../styles/StudentSearch.module.css";
import Link from "next/link";
import StudentList from "../components/StudentList";
import { useState } from "react";

const buttonColor = "#0F5787";

export default function studentSearch({ students }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.studentSearchPage}>
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Search Student..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <div>
        <StudentList students={students} searchTerm={searchTerm} />
      </div>

      <Link href="/">
        <button
          className={styles.button}
          style={{ backgroundColor: buttonColor }}
        >
          Add New
        </button>
      </Link>
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

  return {
    props: {
      students,
    },
  };
};
