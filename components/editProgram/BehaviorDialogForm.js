import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import styles from "../../styles/EditProgram.module.css";

export default function BehaviorDialogForm({ behavior, setBehavior }) {
  return (
    <Paper className={styles.domainPaper}>
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Behavior Name</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          value={behavior.name}
          onChange={(e) =>
            setBehavior({
              ...behavior,
              name: e.target.value,
            })
          }
        />
        <FormHelperText id="my-helper-text">
          Enter the name of your behavior here
        </FormHelperText>
      </FormControl>
      <FormControl
        fullWidth
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <InputLabel htmlFor="my-input">Behavior Description</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          value={behavior.description}
          onChange={(e) =>
            setBehavior({
              ...behavior,
              description: e.target.value,
            })
          }
        />
        <FormHelperText id="my-helper-text">
          Enter the description of your behavior here
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: "1rem" }}>
        <InputLabel id="demo-simple-select-label">Behavior Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={behavior.datatype}
          onChange={(e) => {
            setBehavior((prev) => ({
              ...prev,
              datatype: e.target.value,
            }));
          }}
        >
          <MenuItem value="" disabled>
            Choose a behavior type
          </MenuItem>
          <MenuItem value="trial">Trial</MenuItem>
          <MenuItem value="probe">Probe</MenuItem>
        </Select>
        <FormHelperText id="my-helper-text">
          Choose a behavior type
        </FormHelperText>
      </FormControl>
    </Paper>
  );
}
