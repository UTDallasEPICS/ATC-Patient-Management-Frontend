import PropTypes from "prop-types";
import styles from '../styles/Header.module.css'

const Header = ({ pageTitle }) => {
    return (
        <div className={styles.banner} style={{backgroundColor: "green", marginTop: "-25px"}}>
            <h1>{pageTitle}</h1>
        </div>
    )
}

Header.propTypes = {
    pageTitle: PropTypes.string.isRequired,
  };

export default Header
