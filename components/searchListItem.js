import PropTypes from "prop-types";
import Avatar from "./Avatar";
import styles from "../styles/SearchList.module.css";
import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";

const StudentListItem = ({ firstName, lastName, id, img, destinationPath }) => {
  return (
    <Link href={{ pathname: destinationPath, query: { id: id } }}>
      <ListItem button key={id}>
        <div className={styles.level}>
          <div className={styles.levelItem}>
            <Avatar img={img} />
          </div>
          <div className={styles.levelItem} style={{ paddingLeft: "10px" }}>
            <p>
              {firstName} {lastName}
            </p>
          </div>
        </div>
      </ListItem>
    </Link>
  );
};

StudentListItem.defaultProps = {
  img: "/default-avatar.jpg",
};

StudentListItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default StudentListItem;
