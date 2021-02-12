import PropTypes from "prop-types";
import Avatar from "../components/Avatar";
import styles from "../styles/StudentSearch.module.css";

const studentListItem = ({ firstName, lastName, id, img }) => {
  return (
    <div>
      <div className={styles.level}>
        <div className={styles.levelItem}>
          <Avatar img={img}></Avatar>
        </div>
        <div className={styles.levelItem} style={{paddingLeft: "10px"}}>
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

studentListItem.defaultProps = {
  img: "/default-avatar.jpg",
};

studentListItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default studentListItem;
