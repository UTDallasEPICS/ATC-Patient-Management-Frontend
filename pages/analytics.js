import Navbar from "../components/Navbar";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Analytics.module.css";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Graphs from "../components/Analytics/Graphs/Graphs"
import Reports from "../components/Analytics/Reports/Reports"


const analytics = () => {
  

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

      <Navbar
        pageTitle="Analytics"
        analytics
      >
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
        

        
        {page===0? <Graphs /> : <Reports/>}

      </Navbar>
    </div>
  );
};

export default analytics;
