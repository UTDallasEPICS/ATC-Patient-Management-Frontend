import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import styles from "../../styles/AddSession.module.css";
import Behaviors from "../../components/AddSession/Behaviors";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import React from "react";
import { useState, useEffect } from "react";
import CheckUser  from '../../auth0CheckUser';

//Takes behaviour data from a student's unique program and sends it to components/AddSession/behaviors to load onto session page

interface Behavior {
  name: string;
  description: string;
  datatype: string;
  trialsPerEntry: number;
  entries: string[];
  tags: string[];
}

interface ProgramAsProps
{
  studentID: string;
  studentName: string;
  behaviors: Behavior[];
  responses: string[];
}

const addSession = ({ studentID_, firstName, lastName, patient, employee, behaviors, program}) => {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician"])
  if(!allowed) return(<div>Redirecting...</div>);

  //Create an array of behaviours
  const behaviours = program.behaviours;
  const [behaviorList] = useState<Behavior[]>(
    behaviours.map((behavior: Behavior) => ({
        title: behavior.name,
        description: behavior.description,
        datatype: behavior.datatype,
        trialsPerEntry: 5, //Needs change once backend 'behavior' has necessary components
        entries: ["Trial #1", "Trial #2"], //Needs change once backend 'behavior' has necessary components
        tags: [], //Needs change once backend 'behavior' has necessary components
    }))
  );

  interface Probe //object for JSON conversion
  {
      successes: number;
      failures: number;
  }
  interface Duration //object for JSON conversion
  {
      seconds: number;
  }
  interface Frequency //object for JSON conversion
  {
      occurences: number;
  }
  interface Trial //object for JSON conversion
  {
      value: boolean;
  }

  //Takes array for a probe and returns an object for JSON conversion
  function getProbe(results)
  {
      let success = 0;
      let fails = 0;
      for(var i = 0; i < results.length; i++)
      {
          if(results[i] == "+")
          {
            success++;
          }
          else if(results[i] == "-")
          {
              fails++;
          }
      }
      
      const newProbe: Probe = {successes: success, failures: fails}
      return newProbe;
  }

  //Takes array for a trial and returns an object for JSON conversion
  function getTrial(result)
  {
    let score = false;
    if(result[0] == "+")
    {
      score = true;
    }
    else if(result[0] == "-")
    {
      score = false;
    }

    const newTrial: Trial = {value: score};
    return newTrial;
  }

  //All data for a session
  const programData: ProgramAsProps = 
  {
      studentID: studentID_,
      studentName: firstName + " " + lastName,
      behaviors: behaviorList,
      responses: [],
  };

  //Converts all response data into JSON
  const convertToJSON = (responses) =>
  {
      for(var i = 0; i < responses.length; i++)
      {
          if(programData.behaviors[i].datatype == "duration")
          {
              for(var j = 0; j < programData.behaviors[i].entries.length; j++)
              {
                const newDuration: Duration = {seconds: responses[i][j]};
                responses[i][j] = newDuration;
              }
          }
          else if(programData.behaviors[i].datatype == "frequency")
          {
              for(var j = 0; j < programData.behaviors[i].entries.length; j++)
              {
                const newFrequency: Frequency = {occurences: responses[i][j]};
                responses[i][j] = newFrequency;
              }
          }
          else if(programData.behaviors[i].datatype == "probe")
          {
              for(var j = 0; j < programData.behaviors[i].entries.length; j++)
              {
                  const newProbe: Probe = getProbe(responses[i][j]);
                  responses[i][j] = newProbe;
              }
          }
          else if(programData.behaviors[i].datatype == "trial")
          {
              for(var j = 0; j < programData.behaviors[i].entries.length; j++)
              {
                  const newTrial: Trial = getTrial(responses[i][j]);
                  responses[i][j] = newTrial;
              }
          }
      }
      return responses;
  }

  //Get response data from componenents/AddSession/Behaviors
  const getResponses = (responseArray) =>
  {
      programData.responses = responseArray;
      console.log(programData.responses);
  }

  const submitSession = async () => {
    const reportPostResponse = await fetch('http://localhost:8080/report/', {
      method: "post",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionTime: new Date(),
        data: convertToJSON(programData.responses),
        patient,
        employee,
        behaviors,
      }),
    })
    const reportPostData = await reportPostResponse.json();
    const reportId = reportPostData['data'];
    console.log(reportId)

    const reportResponse = await fetch('http://localhost:8080/report/' + reportId)
    const reportData = await reportResponse.json();
    const report = reportData['data'];
    console.log(report)

    const patientResponse = await fetch(`http://localhost:8080/patient/${patient._id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        reports: [...patient["reports"], report],
      }),
    })

    const patientData = await patientResponse.json();
    console.log(patientData)
  }

  return (
    <div>
      <Head>
        <title>Add Session</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>
      <Navbar pageTitle="Add Session" role={role} >
        <Container className={styles.container}>
          <Behaviors behaviors={programData.behaviors} returnResponses={getResponses} />
          <Link href={`/student/profile?id=${studentID_}`} >
            <Button
                variant="contained"
                color="inherit"
                className="primaryButton"
                style={{ width: "20vh", margin: "auto", marginBottom: "80px" }}
                onClick={submitSession}
              >
                Submit Session
              </Button>
          </Link>
        </Container>
      </Navbar>
    </div>
  ); 


};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
      studentID_: query.studentID,
      firstName: query.firstName,
      lastName: query.lastName,
      patient: patientData['data'],
      employee: employeeData['data'],
      behaviors: programData['data'][0]["behaviours"],
      program: programData['data'][0],
    },
  };
};

export default addSession;