import StackedBarGraph from "./StackedBarGraph";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SimpleLineChart from "./SimpleLineChart";

import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Graphs = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("Use Effect called");
    setDomains(["Domain 1", "Domain 2", "Domain 3"]);
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("Fetch data called");
    setData([
      {
        type: "frequency",
        title: "Frequency Demo",
        data: [
          {
            name: "5/7/2021",
            F: 5,
          },
          {
            name: "5/8/2021",
            F: 7,
          },
          {
            name: "5/9/2021",
            F: 10,
          },
          {
            name: "5/10/2021",
            F: 9,
     
          },
          {
            name: "5/11/2021",
            F: 8,
          },
          {
            name: "5/12/2021",
            F: 4,
          },
          {
            name: "5/14/2021",
            F: 0,
          },
        ],
      },
      {
        type: "trials",
        title: "Trial Demo",
        data: [
          {
            name: "4/21/2021",
            success: 4,
            failure: 6,
          },
          {
            name: "4/28/2021",
            success: 6,
            failure: 4,
          },
          {
            name: "5/7/2021",
            success: 8,
            failure: 2,
          },
          {
            name: "5/14/2021",
            success: 10,
            failure: 0,
          },
        ],
      },
      {
        type: "probe",
        title: "Probe Demo",
      },

      {
        type: "duration",
        title: "Duration Demo",
      },
    ]);
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
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <div>
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
            <MenuItem
              id={domain}
              key={domain}
              onClick={handleClose}
              id={domain}
            >
              {domain}
            </MenuItem>
          ))}
        </Menu>
      </div>

      {data.map((graph) => {
        switch (graph.type) {
          case "frequency":
            return <SimpleLineChart data={graph.data} title={graph.title} />;
          case "trials":
            return <StackedBarGraph data={graph.data} title={graph.title} />;
          case "probe":
            return <h1>Probe Graph</h1>;

          case "duration":
            return <h1>Duration Graph</h1>;
        }
        // console.log(graph.title);
        // return <StackedBarGraph data={graph.data} title={graph.title} />;
      })}

      {/* <StackedBarGraph data={trialData} title="Made Eye Contact" />
      <StackedBarGraph data={trialData} title="Graph 2" /> */}
    </div>
  );
};

export default Graphs;
