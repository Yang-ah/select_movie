import React from "react";
import styles from "./home.module.scss";

import MovieRanking from "../../components/Ranking";
import Category from "./Category";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <div> [순위] </div>
      <MovieRanking />
      <hr />
      <div className={styles.categoryWrapper}> [카테고리] </div>
      <Category />
    </section>
  );
};

export default Home;
