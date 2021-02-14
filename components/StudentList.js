import  {useState} from 'react'
import PropTypes from "prop-types";
import StudentListItem from '../components/StudentListItem'

const StudentList = ({students, searchTerm}) => {
    return (
        <>
         {students.filter((student) => {
            if (searchTerm =="")
                return student 
            else if ((student.firstName + " "  + student.lastName).toLowerCase().includes(searchTerm.toLowerCase()))
                return student
         }).map((student) => (
        //  <h1 key={student.id}>{student.firstName} {student.lastName}</h1>
         <StudentListItem key={student.id} firstName={student.firstName} lastName={student.lastName} id={student.id} img={student.img}/>
         ))}
        </>
    )
}

StudentList.propTypes = {
    students: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
  };

export default StudentList
