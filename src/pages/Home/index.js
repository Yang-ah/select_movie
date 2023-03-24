import React from "react";
import styles from "./home.module.scss";

import MovieRanking from "../../components/Ranking";
import Category from "./Category";
import Comment from "../Detail/Comment";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <h1>순위</h1>
      <MovieRanking />
      <hr />
      <h1>카테고리 / home carousel : 마지막 포스터가 맨앞에 위치</h1>
      <Category />
    </section>
  );
};

export default Home;
