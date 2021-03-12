import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styles from "../../styles/AddSession.module.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";


const ProbeInput = ({ title, trialsPerEntry }) => {
  console.log(title);
  return (
    <Card className={styles.probeEntry}>
      <p>{title}</p>

      <Grid container spacing={1} style={{width:"75%", margin:"auto"}}>
        {[...Array(trialsPerEntry)].map((e, i) => (
          <Grid item>
            <input
              className={styles.checkbox}
              key={i}
              type="checkbox"
              name="nameOfChoice"
              value="1"
            ></input>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProbeInput;
