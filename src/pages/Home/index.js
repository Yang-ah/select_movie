import React from "react";
import styles from "./home.module.scss";

import { RankingCarousel, HomeCarousel } from "../../components";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <top className={styles.contents1}>
        <RankingCarousel />
      </top>
      <bottom className={styles.contents2}>
        <div>
          <h2>🔥 개봉 예정 🔥</h2>
          <HomeCarousel />
          <h2>👀 오늘 이거 볼래? 👀</h2>
          <HomeCarousel />
        </div>
      </bottom>
    </section>
  );
};

export default Home;
