import React from "react";
import styles from "./home.module.scss";

import { RankingCarousel, HomeCarousel } from "../../components/Carousel";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <h1>순위</h1>
      <RankingCarousel />
      <hr />
      <h1>카테고리 / home carousel : 마지막 포스터가 맨앞에 위치</h1>
      <div className={styles.contents}>
        <h2>🔥 개봉 예정 🔥</h2>
        <HomeCarousel />
        <h2>👀 오늘 이거 볼래? 👀</h2>
        <HomeCarousel />
      </div>
    </section>
  );
};

export default Home;
