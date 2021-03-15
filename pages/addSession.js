import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import styles from "../styles/AddSession.module.css";
import Behaviors from "../components/AddSession/Behaviors";
import Head from "next/head";

const addSession = ({ program }) => {
  const { studentID, firstName, lastName, behaviors } = program;

  return (
    <div>
      <Head>
        <title>Add Session</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Add Session" />
      <Container className={styles.container}>
        <Behaviors behaviors={behaviors} />

        <Button
          variant="contained"
          color="inherit"
          className="primaryButton"
          style={{ width: "20vh", margin: "auto", marginBottom:"80px" }}
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
        title: "Episodes of Challenging Behavior",
        description:
          "May include, crying, yelling, screaming, whining, and dropping to the ground",
        type: "duration",
        trialsPerEntry: 1,
      },
      {
        title: "Following Steps",
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
        tags: ["Listener Reponding"],
      },
      {
        title: "Responding to Name",
        description:
          "Make eye contact when name is called first with a visual cue, then without a visual cue",
        type: "probe",
        trialsPerEntry: 10,
        tags: ["Listener Reponding", "Visual Cues"],
      },
      {
        title: "LISTENER RESPONDING",
        description:
          "Make eye contact when name is called first with a visual cue, then without a visual cue",
        type: "probe",
        trialsPerEntry: 1,
      },
    ],
  };

  return {
    props: {
      program,
    },
  };
};

export default addSession;
