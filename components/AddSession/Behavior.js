import styles from "../../styles/AddSession.module.css";
import Grid from "@material-ui/core/Grid";
import ProbeInput from "./ProbeInput";
import DurationInput from "./DurationInput";
import FrenquencyInput from "./FrequencyInput";
import Card from "@material-ui/core/Card";

import Paper from "@material-ui/core/Paper";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Behavior({ data }) {
  const { trialsPerEntry, title, entries, description, type } = data;
  return (
    <div className={styles.behaviorBox}>
    {/* <Card variant="outlined">*/}
      <p className={styles.behaviorTitle}>{title}</p>

      <Accordion style={{marginBottom:"10px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>

      

      <Grid container xs={12}>
        <Grid container justify="center" spacing={2}>
          {entries.map((entry) => (
            <Grid item key={entry} item>
              <ProbeInput title={entry} trialsPerEntry={trialsPerEntry}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    {/* </Card> */}

     </div>
  );
}
