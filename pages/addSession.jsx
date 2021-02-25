import Navbar from "../components/Navbar";
import Button from '@material-ui/core/Button'

const addSession = ({ program }) => {
  return (
    <div>
      <Navbar pageTitle="Add Session" />
      {program.studentID}
      <Button variant="contained" color="inherit">
        Primary
      </Button>
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
