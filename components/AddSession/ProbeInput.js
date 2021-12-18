import styles from "../../styles/AddSession.module.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";

const ProbeInput = ({ title, trialsPerEntry }) => {
  const [checkedData, setCheckedData] = useState([]);
  useEffect(() => initializeArray(trialsPerEntry), [trialsPerEntry]);
  const initializeArray = (trialsPerEntry) => {
    for (var i = 0; i < trialsPerEntry; i++) {
      setCheckedData((checkedData) => [...checkedData, " "]);
    }
  };

  const switchValue = (value, i) => {
    setCheckedData((checkedData) => {
      let items = [...checkedData];
      let item = items[i];
      item = value;
      items[i] = item;
      return items;
    });
  };

  return (
    <Card className={styles.probeEntry}>
      <p>{title}</p>

      <Grid container spacing={1} justify="center">
        {[...Array(trialsPerEntry)].map((e, i) => (
          <Grid item key={i}>
            <Button
              className = {styles.probeInputBox}
              variant="outlined"
              onClick={() => {
                switch (checkedData[i]) {
                  case " ":
                    switchValue("+", i);
                    break;
                  case "-":
                    switchValue("+", i);
                    break;
                  case "+":
                    switchValue("-", i);
                    break;
                }
              }}
            >
              <p className={styles.probeEntryText}>{checkedData[i]}</p>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProbeInput;
