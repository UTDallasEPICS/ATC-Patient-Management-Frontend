import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import Login from "../components/Login.js";
export default function Home() {
  const sampUser = {
    username: "epics",
    password: "password",
  };

  const [user, setUser] = useState({ username: "" });
  const [error, setError] = useState("");

  //Function for login
  const LoginFunct = (details) => {
    console.log(details);

    if (
      details.name == sampUser.username &&
      details.password == sampUser.password
    ) {
      console.log("Logged In");
      setUser({
        username: details.name,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <div style={{marginBottom:"50px"}}>
        <img src="/logo.jpeg" alt="logo" />
      </div>
      <Login loginf={LoginFunct} error={error} />
    </div>
  );
}
