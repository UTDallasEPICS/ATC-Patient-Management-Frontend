import styles from "../../styles/AddSession.module.css";
import Grid from "@material-ui/core/Grid";
import ProbeInput from "./ProbeInput";
import DurationInput from "./DurationInput";
import FrenquencyInput from "./FrequencyInput";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

//Displays behaviour info and inputs on page
//Behaviours taken from a student's unique program in /pages/session/add

export default function Behavior({ behaviorCount, data, returnData }) {
  //console.log(behaviorCount);
  const {title, description, datatype } = data;
  const trialsPerEntry = data.trialsPerEntry || 1;
  const entries = data.entries || [""];
  const tags = data.tags || [""];
  let entryCounter = 0;
  const responses = [];

  const setResponse = (response, entryNumber) =>
  {
    responses[entryNumber] = response;
    returnData(behaviorCount, responses)
  }
  
  //Generates an input field depending on the type of behaviour
  const generateInput = (entry, entryNumber) => {
    entryCounter++;
    switch (datatype) {
      case "probe":
        return <ProbeInput title={entry} trialsPerEntry={trialsPerEntry} entryNumber={entryNumber} setResponses={setResponse}/>;
      case "trial":
          return <ProbeInput title={entry} trialsPerEntry={1} entryNumber={entryNumber} setResponses={setResponse}/>;
      case "duration":
        return <DurationInput title={entry} trialsPerEntry={trialsPerEntry} entryNumber={entryNumber} setResponses={setResponse}/>;
      case "frequency":
        return <FrenquencyInput title={entry} entryNumber={entryNumber} setResponses={setResponse}/>;
    }
  };

  return (
    <div className={styles.behaviorBox}>
      <p className={styles.behaviorTitle}>{title}</p>
      <p>
          <Typography>Description:</Typography>
          <Typography>{description}</Typography>
      </p>

      <Grid container justify="center" spacing={2}>
        {entries.map((entry) => (
          <Grid item key={entry}>
            {generateInput(entry, entryCounter)}
          </Grid>
        ))}
      </Grid>

      <Divider style={{ marginTop: "40px" }} />
      <ul className={styles.tagsSection}>
        {tags.map((tag, i) => {
          return (
            <li key={tag}>
              {tag != "" ? <Chip className={styles.tagItem} label={tag} /> : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
}