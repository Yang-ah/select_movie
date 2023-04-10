import React from "react";
import styles from "./logoHome.module.scss";
import { RankingCarousel } from "../../components";




const LogoHome = () => {

  return (
    <section className={styles.LogoHome}>
      <h1 className={styles.logoText}>무비셀렉터</h1>
    </section>
  );
};

export default LogoHome;
