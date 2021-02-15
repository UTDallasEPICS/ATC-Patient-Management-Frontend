import PropTypes from "prop-types";
import styles from "../styles/Navbar.module.css";
import { IoMenu } from "react-icons/io5";
import Link from 'next/link'

const Navbar = ({ pageTitle }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.menuToggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        <ul className={styles.menu}>
            <Link href="/"><li className={styles.link}>Students</li></Link>
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
