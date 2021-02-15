import PropTypes from "prop-types";
import Avatar from "./Avatar";
import styles from "../styles/StudentSearch.module.css";
import Link from "next/link";

const StudentListItem = ({ firstName, lastName, id, img }) => {
  return (
    <div>
      <Link href="/">
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
      </Link>
    </div>
  );
};

StudentListItem.defaultProps = {
  img: "/default-avatar.jpg",
};

StudentListItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default StudentListItem;
