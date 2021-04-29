import React from "react";
import PropTypes from "prop-types";
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
import Typography from "@material-ui/core/Typography";

import {PRIMARY_COLOR} from "../../../styles/constants"


// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleLineChart = ({ data, title, dataKey }) => {

  return (
    <div style={{ marginBottom: "50px", marginTop: "20px", height: "400px" }}>
    <Typography variant="h4" component="h2">
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={PRIMARY_COLOR} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
  </div>
  );
};

SimpleLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired
};

export default SimpleLineChart;
