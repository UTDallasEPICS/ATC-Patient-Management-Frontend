import PropTypes from "prop-types";
import styles from '../styles/Navbar.module.css'

const Navbar = ({ pageTitle }) => {
    return (
        <div className={styles.banner}>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
        </div>
    )
}

Navbar.propTypes = {
    pageTitle: PropTypes.string.isRequired,
  };

export default Navbar
