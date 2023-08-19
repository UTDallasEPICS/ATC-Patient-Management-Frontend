import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/Analytics.module.css";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Graphs from "../../components/Analytics/Graphs/Graphs";
import Reports from "../../components/Analytics/Reports/Reports";
import CheckUser from "../../auth0CheckUser";

const analytics = ({ patient, reports }) => {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician", "Guardian"])
  if(!allowed) return(<div>Redirecting...</div>);

  const [page, setPage] = useState(0);

  const handlePageChange = (event, newValue) => {
    console.log(newValue);
    setPage(newValue);
  };

  return (
    <div>
      <Head>
        <title>Analytics</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Analytics" role={role} analytics>
        <div>
          <Paper square>
            <Tabs
              value={page}
              onChange={handlePageChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Graphs" />
              <Tab label="Reports" />
            </Tabs>
          </Paper>
        </div>

        {page === 0 ? (
          <Graphs studentID={patient._id} />
        ) : (
          <Reports reports={reports} />
        )}
      </Navbar>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const studentID = query.studentID;

  const patientRes = await fetch(
    `http://localhost:8080/patient/${query.studentID}`
  );
  const patientData = await patientRes.json(); 

  let reports = []
  for(const reportID of patientData['data']['reports']) {
    const response = await fetch(`http://localhost:8080/report/${reportID}`)
    const {data} = await response.json();
    reports.push(data)
  }
  console.log(reports)

  return {
    props: {
      patient: patientData['data'],
      reports: reports,
    },
  };
};

export default analytics;
