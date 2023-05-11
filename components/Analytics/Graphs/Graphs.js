import StackedBarGraph from "./StackedBarGraph";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SimpleLineChart from "./SimpleLineChart";
import ProbeGraph from "./ProbeGraph";

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

const Graphs = ( {studentID} ) => {
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
    console.log("studentID = " + studentID);

    // the data below controls how the graph looks, please play with it to get a better understanding
    // basically, the reports data we have been collecting can be accesed by doing patients.reports (not sure if thats accurate)
    // you could either do that or fetch the reports separately

    // title would be the name of the behavoir, since we have all the reports you would need to iterate through 
    setData([
      {
        type: "frequency",
        title: "Frequency Demo",
        data: [
          {
            name: "5/7/2021",
            Occurrences: 5,
          },
          {
            name: "5/8/2021",
            Occurrences: 7,
          },
          {
            name: "5/9/2021",
            Occurrences: 10,
          },
          {
            name: "5/10/2021",
            Occurrences: 9,
          },
          {
            name: "5/11/2021",
            Occurrences: 8,
          },
          {
            name: "5/12/2021",
            Occurrences: 4,
          },
          {
            name: "5/14/2021",
            Occurrences: 0,
          },
        ],
      },
      {
        type: "duration",
        title: "Duration Demo",
        data: [
          {
            name: "5/7/2021",
            Seconds: 30,
          },
          {
            name: "5/8/2021",
            Seconds: 47,
          },
          {
            name: "5/9/2021",
            Seconds: 50,
          },
          {
            name: "5/10/2021",
            Seconds: 42,
          },
          {
            name: "5/11/2021",
            Seconds: 36,
          },
          {
            name: "5/12/2021",
            Seconds: 25,
          },
          {
            name: "5/14/2021",
            Seconds: 15,
          },
          {
            name: "5/15/2021",
            Seconds: 7,
          },
          {
            name: "5/16/2021",
            Seconds: 0,
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
        data: [
          {
            name: "5/14/2021",
            value: false,
          },
          {
            name: "5/15/2021",
            value: true,
          },
          {
            name: "5/16/2021",
            value: false,
          },
        ],
      },
    ]);
  };


  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>

      {data.map((graph) => {
        switch (graph.type) {
          case "trials":
            return <StackedBarGraph key={graph.title} data={graph.data} title={graph.title} />;
          case "probe":
            return <ProbeGraph  key={graph.title} data={graph.data} title={graph.title}/>;

          case "duration":
            return (
              <SimpleLineChart
                data={graph.data}
                dataKey="Seconds"
                title={graph.title}
                key={graph.title}
              />
            );
          case "frequency":
            return (
              <SimpleLineChart
                data={graph.data}
                dataKey="Occurrences"
                title={graph.title}
                key={graph.title}
              />
            );
        }
      })}
    </div>
  );
};

export default Graphs;
