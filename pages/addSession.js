import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import styles from "../styles/AddSession.module.css";

const addSession = ({ program }) => {
  return (
    <div>
      <Navbar pageTitle="Add Session" />
      <Container className={styles.container}>
        <Button
          variant="contained"
          color="inherit"
          className={styles.centeredButton}
        >
          Submit Session
        </Button>
      </Container>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  console.log(query);

  const program = {
    studentID: query.studentID,
  };

  return {
    props: {
      program,
    },
  };
};

export default addSession;
