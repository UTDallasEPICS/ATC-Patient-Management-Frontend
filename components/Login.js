import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

//Gets Login function and error function to help loggin in logic
const Login = ({ loginf, error }) => {
  const [details, setDetails] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const submitHandler = (e) => {
    e.preventDefault();

    loginf(details);
  };

  const handleClickShowPassword = (event) => {
    setDetails({ ...details, showPassword: !details.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setDetails({ ...details, [prop]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={styles.loginData}>
          <FormControl className="" variant="filled">
            <InputLabel htmlFor="standard-adornment-username">
              Username
            </InputLabel>
            <Input
              id="standard-adornment-username"
              type="text"
              value={details.username}
              onChange={handleChange("username")}
            />
          </FormControl>
          <FormControl className="" variant="filled">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={details.showPassword ? "text" : "password"}
              value={details.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {details.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <Link href="/studentSearch">
          <Button type="submit" variant="contained" className="primaryButton" style={{width:"100%"}}>
            Sign In
          </Button>
        </Link>

        <Button className="" style={{ width:"100%", marginTop:"2vh"}}>
          Forgot Password?
        </Button>
      </form>
    </div>
  );
};

export default Login;
