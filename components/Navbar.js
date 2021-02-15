import PropTypes from "prop-types";
import styles from "../styles/Navbar.module.css";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";

const Navbar = ({ pageTitle }) => {
  const accordionClick = (e) => {
    let button = e.target;
    if (button instanceof HTMLLIElement) {
       button = e.target.parentElement;
    }
    console.log("e.target: " + e.target);

    let content = button.nextElementSibling;
    console.log("content: " + content);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.menuToggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        <ul className={styles.menu}>
          {/* <Link href="/">
            <li className={styles.link}>Students</li>
          </Link> */}

          <button
            onClick={accordionClick}
            type="button"
            className={styles.collapsible}
          >
            <li className={styles.link}>Students</li>
          </button>
          <div className={styles.content}>
            <ul className={styles.indentedMenu}>
              <Link href="/">
                <li className={styles.link}>Search</li>
              </Link>
              <Link href="/">
                <li className={styles.link}>Add new</li>
              </Link>
            </ul>
          </div>

          <Link href="/">
            <li className={styles.link}>Schedule</li>
          </Link>
          <Link href="/">
            <li className={styles.link}>Logout</li>
          </Link>
        </ul>
      </div>

      <h1 className={styles.pageTitle}>{pageTitle}</h1>
    </div>
  );
};

Navbar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Navbar;
