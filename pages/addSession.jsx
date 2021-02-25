import Navbar from '../components/Navbar'

const  addSession = ({program}) =>{
    return (
        <div>
            <Navbar pageTitle="Add Session"/>
            {program.studentID}
        </div>
    )
}

export const getServerSideProps = async ( {query}) => {
    console.log(query);

    const program = {
        studentID: query.studentID
    }

    return {
        props: {
          program,
        },
      };
}

export default addSession;