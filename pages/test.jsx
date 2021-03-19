import React from 'react';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';



const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function CustomizedInputs() {


  return (
    <form  noValidate>
     
      <ThemeProvider theme={theme}>
        <TextField
          label="ThemeProvider"
          id="mui-theme-provider-standard-input"
          inputProps={{style: {color:'white'}}}
        />
        <TextField
         
          label="ThemeProvider"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
        />
      </ThemeProvider>
      
    </form>
  );
}
