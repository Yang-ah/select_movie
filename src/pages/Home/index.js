import React from "react";
import styles from "./home.module.scss";
import { RankingCarousel, HomeCarousel } from "../../components";
import { motion  , useScroll } from "framer-motion";
const Home = () => {

  const { scrollYProgress } = useScroll();

  return (

    <section className={styles.wrapper}>
   
      <article className={styles.ranking}>
        <div className={styles.background} />
        <div>
          <RankingCarousel />
        </div>
      </article>
      <article className={styles.category}>
        <h2>🔥 개봉 예정 🔥</h2>
        <HomeCarousel />
        <h2>👀 오늘 이거 볼래? 👀</h2>
        <HomeCarousel />
      </article>
      <article className={styles.category}>
        <h2>🔥 개봉 예정 🔥</h2>
        <HomeCarousel />
        <h2>👀 오늘 이거 볼래? 👀</h2>
        <HomeCarousel />
      </article>
    </section>
  );
};

export default Home;
