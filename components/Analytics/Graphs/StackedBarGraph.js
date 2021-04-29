import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Typography from "@material-ui/core/Typography";

const StackedBarGraph = ({ data, title }) => {
  // useEffect(() => {
  //   console.log("Use Effect on bar graph");
  // }, [data]);

  return (
    <div style={{ marginBottom: "4vw", marginTop: "20px" }}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="success" stackId="a" fill="#82ca9d" />
          <Bar dataKey="failure" stackId="a" fill="#ff6666" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

StackedBarGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default StackedBarGraph;
