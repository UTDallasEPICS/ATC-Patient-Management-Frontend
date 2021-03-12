import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styles from "../../styles/AddSession.module.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const ProbeInput = ({ title, trialsPerEntry }) => {
  return (
    <div className={styles.probeEntry}>
      <div>
        {_.times(trialsPerEntry, () => (
          <Card>
            <FormControlLabel
              value="top"
              control={<Checkbox color="primary" />}
              label={title}
              labelPlacement="top"
            />
          </Card>
        ))}
      </div>
      ;
    </div>
  );
};

export default ProbeInput;
