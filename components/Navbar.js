import PropTypes from "prop-types";
import styles from '../styles/Header.module.css'

const Navbar = ({ pageTitle }) => {
    return (
        <div className={styles.banner} style={{backgroundColor: "green", padding: 0}}>
            <h1>{pageTitle}</h1>
        </div>
    )
}

Navbar.propTypes = {
    pageTitle: PropTypes.string.isRequired,
  };

export default Navbar
