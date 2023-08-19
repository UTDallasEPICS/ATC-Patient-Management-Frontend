import React, { useState } from "react";

const editProgram = ({ patient, employee, behaviors }) => {
  console.log(patient);
  console.log(employee);
  console.log(behaviors);
  var reportId = null;
  var report = null;

  const [ID, setID] = React.useState('')
  const onChange = (event) => {
    console.log(event.target.value)
    setID(event.target.value)
  }

  const handleClick = async () => {
    
    const response = await fetch('http://localhost:8080/report/', {
      method: "post",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionTime: new Date(),
        data: "fart",
        patient,
        employee,
        behaviors,
      }),
    })
    const {data} = await response.json();
    reportId = data;
    console.log(data)
  }

  const updateUser = async () => {
    console.log(patient._id)
    const response = await fetch(`http://localhost:8080/patient/${patient._id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        reports: [...patient["reports"], report],
      }),
    })

    const data = await response.json();
    console.log(data)
  }

  const getReport = async () => {
    const response = await fetch('http://localhost:8080/report/' + reportId)
    const {data} = await response.json();
    report = data;
    console.log(data)
  }

  const getStudentReports = async () => {
    let studentReports = []
    for(const reportID of patient['reports']) {
      const response = await fetch(`http://localhost:8080/report/${reportID}`)
      const {data} = await response.json();
      studentReports.push(data)
    }
    console.log(studentReports)
  }

  const deleteReport = async () => {
    const updatedReports = []
    patient['reports'].forEach((reportID) => {
      if (reportID !== ID) updatedReports.push(reportID)
    })
    console.log(updatedReports)
    const response = await fetch(`http://localhost:8080/patient/${patient._id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        reports: updatedReports,
      }),
    })

    const data = await response.json();
    console.log(data)
  }



  return (
    <div>

      <button onClick={async() => {
        const employeeRes = await fetch(
          `http://localhost:8080/employee`
        );
        
        const employeeData = await employeeRes.json();
      
        console.log(employeeData["data"]) 
      }} >
        get employees
      </button>

      <button onClick={handleClick}>
        add session
      </button>

      <button onClick={getReport}>
        get report
      </button>

      <button onClick={updateUser}>
        update user
      </button>

      <button onClick={getStudentReports}>
        getStudentReports
      </button>

      <input onChange={onChange}></input>
      <button onClick={deleteReport} > Delete ID </button>

      {/* {studentID} */}
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const patientRes = await fetch(
    `http://localhost:8080/patient/${query.studentID}`
  );
  const patientData = await patientRes.json(); 

  const employeeRes = await fetch(
    `http://localhost:8080/employee/64518555b5b62f1086e74d80`
  );
  const employeeData = await employeeRes.json();

  const programRes = await fetch(
    `http://localhost:8080/patient/program/${query.studentID}`
  );
  const programData = await programRes.json();

  return {
    props: {
      patient: patientData['data'],
      employee: employeeData['data'],
      behaviors: programData['data'][0]["behaviours"],
    },
  };
};

export default editProgram;