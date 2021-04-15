import Navbar from "../components/Navbar";
import Head from "next/head";
import { useState, useEffect } from "react";
import StackedBarGraph from "../components/Graphs/StackedBarGraph";
import styles from "../styles/Analytics.module.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const analytics = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    console.log("Use Effect called");
    fetchData();
  }, []);

  const fetchData = async () => {
    setDomains([..."Domain 1", "Domain 2", "Domain 3"]);
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [page, setPage] = useState(0);

  const handlePageChange = (event, newValue) => {
    console.log(newValue);
    setPage(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    console.log(e.target.id);
    setAnchorEl(null);
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
        onChangeAnalyticsPage={handlePageChange}
        analyticsPageValue={page}
      >
        <div>
          <div style={{ position: "fixed" }}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Select Domain
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {domains.map((domain) => (
                <MenuItem id={domain} onClick={handleClose} id={domain}>
                  {domain}
                </MenuItem>
              ))}
            </Menu>
          </div>

            <StackedBarGraph data={data} />
        </div>
      </Navbar>
    </div>
  );
};

export default analytics;
