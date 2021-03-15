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
      setCheckedData(checkedData => [...checkedData, " "]);
    }
  };

  return (
    <Card className={styles.probeEntry}>
      <p>{title}</p>

      <Grid container spacing={1} justify="center">
        {[...Array(trialsPerEntry)].map((e, i) => (
          <Grid item key={i}>
            <input
              className={styles.checkbox}
              type="text"
              name="triState"
              readOnly={true}
              value="+"
              onClick={(e) => {
                switch (e.target.value.charAt(0)) {
                  case " ":
                    e.target.value = "+";
                    break;
                  case "-":
                    e.target.value = "+";
                    break;
                  case "+":
                    e.target.value = "-";
                    break;
                }
              }}
            ></input>

            <Button
              variant="outlined"
              onClick={() => {
                switch(checkedData[i]){
                  case " ": setCheckedData(checkedData => { 
                    let items = [...checkedData];
                    let item = items[i];
                    item = "+";
                    items[i] = item;
                    return items;
                  }); break;//checkedData[i] = "+"; break;
                }

                console.log(checkedData)
              }}
            >
              {checkedData[i]}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProbeInput;
