import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import styles from "../styles/GenInfo.module.css";
import { Container } from '@material-ui/core';




const GenInfo = () => {
  const [domain, setDomain] = React.useState('');
  const handleChange = (event) => {
    setDomain(event.target.value);
  };

  const [hide, setHide] = React.useState(false);

	const doNotShow = () => {
		setHide(false);
	};
    const show = () => {
		setHide(true);
	};
    return (
        <div className = {styles.container}>
        <div className={styles.testFields}>
         <TextField id="standard-basic" label="Name" /> <br/>
         <TextField id="standard-basic" label="Description" /> <br/>
         </div>
            <FormControl >
        <Select
          value={domain}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Type
          </MenuItem>
          <MenuItem value={1} onClick={show}>Probe </MenuItem>
          <MenuItem value={2} onClick={doNotShow}>Frequency</MenuItem>
          <MenuItem value={3} onClick={doNotShow}>Duration</MenuItem>
        </Select>
        <FormHelperText>Select Behavior Type</FormHelperText>
      </FormControl>

      {hide && (
		<MenuItem >
		<TextField
        className={styles.hide}
          id="standard-number"
          label="Number of Trials"
          type="number"
          
        />
				</MenuItem>
			)}
      
        </div>
    )
}

export default GenInfo
