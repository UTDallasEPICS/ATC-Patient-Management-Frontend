import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/login.module.css";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";

//Gets Login function and error function to help loggin in logic
const Login = ({ loginf, error }) => {
  const [details, setDetails] = useState({ name: "", password: "" });
  const submitHandler = (e) => {
    e.preventDefault();

    loginf(details);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <img className={styles.loginLogo} src="/logo.jpeg" alt="logo" /> <br />
        <div className={styles.loginData}>
          <label htmlfor="name">Username:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>
        <div className={styles.loginData}>
          <label htmlfor="password">Password:</label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <Link href="/studentSearch">
          <input className={styles.btn} type="submit" value="Sign In" />
        </Link>
        <button className={styles.btn}>Forgot Password</button>
      </form>
    </div>
  );
};

export default Login;
