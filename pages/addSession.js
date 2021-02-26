import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import styles from "../styles/AddSession.module.css";

const addSession = ({ program }) => {
  const { studentID, firstName, lastName, behaviors } = program;

  return (
    <div>
      <Navbar pageTitle="Add Session" />
      <Container className={styles.container}>
        <div>
          {behaviors.map((behavior) => (
            <h1>{behavior.title}</h1>
          ))}
        </div>

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
    firstName: "John",
    lastName: "Doe",
    behaviors: [
      {
        title: "LISTENER RESPONDING",
        description:
          " Will follow 20 1-step instructions, each for 3 trials a session across three consecutive sessions.",
        type: "probe",
        trialsPerEntry: 3,
        entries: [
          "Shoulders",
          "Wiggle Fingers",
          "Pat Lap",
          "Touch Knees",
          "Stick Tongue",
        ],
      },
      { title: "Behavior 2" },
      { title: "Behavior 3" },
    ],
  };

  return {
    props: {
      program,
    },
  };
};

export default addSession;
