import React, { useState } from "react";

import styles from "./home.module.scss";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <div>순위별 포스터</div>
      <div>카테고리별 영화</div>
    </section>
  );
};

export default Home;