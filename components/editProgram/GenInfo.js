import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import styles from "../../styles/GenInfo.module.css";
import { Container } from "@material-ui/core";

const GenInfo = ({
  globalBehavior,
  behaviorId,
  setBehaviorId,
  updateBehavior,
}) => {
  const handleChange = (event) => {
    setBehaviorId(event.target.value);
    updateBehavior(event.target.value);
  };

  const [hide, setHide] = React.useState(false);

  const doNotShow = () => {
    setHide(false);
  };
  const show = () => {
    setHide(true);
  };
  return (
    <div className={styles.container} style={{ minWidth: "400px" }}>
      <FormControl>
        <Select value={behaviorId} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>
            Choose behavior
          </MenuItem>
          {globalBehavior.map((behavior, idx) => (
            <MenuItem key={idx} value={behavior._id}>
              {behavior.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select Behavior Type</FormHelperText>
      </FormControl>

      {hide && (
        <MenuItem>
          <TextField
            className={styles.hide}
            id="standard-number"
            label="Number of Trials"
            type="number"
          />
        </MenuItem>
      )}
    </div>
  );
};

export default GenInfo;
