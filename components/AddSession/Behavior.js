import styles from "../../styles/AddSession.module.css";
import Grid from "@material-ui/core/Grid";
import ProbeInput from "./ProbeInput";
import DurationInput from "./DurationInput";
import FrenquencyInput from "./FrequencyInput";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

export default function Behavior({ data }) {
  const {title, description, type } = data;
  const trialsPerEntry = data.trialsPerEntry || 1;
  const entries = data.entries || [""];
  const tags = data.tags || [""];
  console.log(type);

  const generateInput = (entry) => {
    switch (type) {
      case "probe":
        return <ProbeInput title={entry} trialsPerEntry={trialsPerEntry} />;
      case "duration":
        return <DurationInput title={entry} trialsPerEntry={trialsPerEntry} />;
      case "frequency":
        return <FrenquencyInput title={entry} />;
    }
  };

  return (
    <div className={styles.behaviorBox}>
      <p className={styles.behaviorTitle}>{title}</p>

      <Accordion style={{ marginBottom: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{description}</Typography>
        </AccordionDetails>
      </Accordion>

      <Grid container justify="center" spacing={2}>
        {entries.map((entry, i) => (
          <Grid item key={i}>
            {generateInput(entry)}
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
