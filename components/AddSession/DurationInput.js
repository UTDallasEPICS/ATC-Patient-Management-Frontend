import Stopwatch from "./Stopwatch/Stopwatch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "../../styles/AddSession.module.css";
import { useState, useEffect } from "react";

const DurationInput = () => {
  const [times, setTimes] = useState([]);
  let i = 0;

  const addStopwatch = () => {
    console.log("add stopwatch");
    
    // setTimes((times) => {
    //     times = [...times, 0]
    // });
  };

  return (
    <div>
      <Stopwatch i={i}/>
      <div style={{ display: "table", margin: "auto", marginTop: "20px" }}>
        <Fab
          onClick={addStopwatch}
          className={styles.addStopwatchButton}
          size="medium"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default DurationInput;
