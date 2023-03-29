import React from "react";
import styles from "./home.module.scss";

import { RankingCarousel, HomeCarousel } from "../../components";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      {/* //NOTE: contents1 -> ranking */}
      <article className={styles.contents1}>
        <RankingCarousel />
      </article>
      {/* //NOTE: contents2 -> genres */}
      <article className={styles.contents2}>
        <h2>🔥 개봉 예정 🔥</h2>
        <HomeCarousel />
        <h2>👀 오늘 이거 볼래? 👀</h2>
        <HomeCarousel />
      </article>
    </section>
  );
};

export default Home;
