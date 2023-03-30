import React from "react";
import styles from "./home.module.scss";

import { RankingCarousel, HomeCarousel } from "../../components";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <article className={styles.ranking}>
        <RankingCarousel />
      </article>
      <article className={styles.category}>
        <div>
          <h2>🔥 개봉 예정 🔥</h2>
          <HomeCarousel />
          <h2>👀 오늘 이거 볼래? 👀</h2>
          <HomeCarousel />
        </div>
      </article>
    </section>
  );
};

export default Home;
