import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button
          onClick={() => {
            signIn();
          }}
        >
          Login
        </button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
