import Stopwatch from "./Stopwatch/Stopwatch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "../../styles/AddSession.module.css";
import { useState, useEffect } from "react";

const DurationInput = () => {
  return (
    <div>
      <div
        style={{ display: "table", margin: "auto", marginTop: "20px" }}
      >
        <Stopwatch/>
      </div>
    </div>
  );
};

export default DurationInput;
