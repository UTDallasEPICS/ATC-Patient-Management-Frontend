import  {useState} from 'react'
import PropTypes from "prop-types";

const StudentList = ({students, searchTerm}) => {
    return (
        <>
         {students.filter((student) => {
            if (searchTerm =="")
                return student 
            else if ((student.firstName + " "  + student.lastName).toLowerCase().includes(searchTerm.toLowerCase()))
                return student
         }).map((student) => (
         <h1 key={student.id}>{student.firstName} {student.lastName}</h1>
         ))}
        </>
    )
}

StudentList.propTypes = {
    students: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
  };

export default StudentList
