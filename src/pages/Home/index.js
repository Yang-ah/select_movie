import React from "react";
import { Link } from "react-router-dom";
import { Preview } from "../../components/Comment";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <>
      <Preview className={styles.preview} />

      <Link to="/detail/0151449f-d2ae-4753-a44c-79be9044f8ff">go detail</Link>
    </>
  );
};

export default Home;
