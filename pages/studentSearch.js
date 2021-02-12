import Head from "next/head";
import Student from "../components/studentListItem";
import styles from "../styles/StudentSearch.module.css";
import Link from "next/link";

const buttonColor = "#0F5787";

export default function studentSearch() {
  return (
    <div>
      <div>
        <Student firstName="John" lastName="Doe" id="id" />
      </div>
      <div>
        <h1>This is the student search page</h1>
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
