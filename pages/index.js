import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "../components/Login.js";
export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <div style={{marginBottom:"50px"}}>
        <img src="/logo.jpeg" alt="logo" />
      </div>
        <Login />
    </div>
  );
}
