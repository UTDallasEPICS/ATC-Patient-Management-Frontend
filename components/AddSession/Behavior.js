import styles from "../../styles/AddSession.module.css";
import Grid from "@material-ui/core/Grid";
import ProbeInput from "./ProbeInput";
import DurationInput from "./DurationInput";
import FrenquencyInput from "./FrequencyInput";
import Card from "@material-ui/core/Card";

import Paper from "@material-ui/core/Paper";

export default function Behavior({ data }) {
  const { trialsPerEntry, title, entries, description, type } = data;
  console.log(entries);

  return (
    // <div className={styles.behaviorBox}>
    <Card variant="outlined">
      <p className={styles.behaviorTitle}>{title}</p>

      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {entries.map((entry) => (
            <Grid key={entry} item>
              <ProbeInput title={entry} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Card>

    // </div>
  );
}
