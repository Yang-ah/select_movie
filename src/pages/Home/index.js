import React from "react";

import styles from "./home.module.scss";

import MovieRanking from "../../components/Ranking";
import MovieScroll from "../../components/Slider";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <div>순위</div>
      <MovieRanking />
      <hr />
      <div>카테고리</div>
      <MovieScroll />
    </section>
  );
};

export default Home;
