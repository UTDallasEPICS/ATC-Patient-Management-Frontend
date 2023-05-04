import React from "react";

const editProgram = ({ studentID, program }) => {
  
    console.log(program)

    const report = async () => {
        const res = await fetch(
            `http://localhost:8080/report/${studentID}`
        );
        const status = await res.status
        const { data } = await res.json();
        console.log({
            'Status': status,
            'Data': data,
        });
    }

    const createReport = async () => {
        const date = new Date();
        const time = date.getTime();
        console.log(time)

        const response = await fetch("http://localhost:8080/report/", {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentId: studentID,
                sessionTime: time,
                data: "TEST",
                patient: program.patient,
                employee: "IDK",
                behaviors: program.behaviors,
            }),
        });

        console.log(response);
    }

    return (
    <div>
      {studentID}
      <button onClick={report}>Clicky Thicky</button>
      <button onClick={createReport}>Creaty</button>
      <form>
        Demo Report 
        <label>Prof</label>
        <input type="text"></input>
      </form>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const temp = await fetch(
    `http://localhost:8080/patient/program/${query.studentID}`
  );
  const { data } = await temp.json();
  return {
    props: {
      studentID: query.studentID,
      program: data[0],
    },
  };
};

export default editProgram;
