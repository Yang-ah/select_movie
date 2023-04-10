import React from "react";
import styles from "./home.module.scss";
import { RankingCarousel } from "../../components";
import { ActionCarousel, CrimeCarousel, FamilyCarousel, RomanceCarousel } from "../../components/Carousel2";
import LogoHome from "./LogoHome";
import { motion, useIsPresent } from "framer-motion";



const Home = () => {

  const isPresent = useIsPresent();

  return (
    /* <motion.div
    animate={{y : 100}}
  > */
    <section className={styles.wrapper}>
      <article>
        <LogoHome/>
      </article>
      <article className={styles.ranking}>
        <div>
          <RankingCarousel />
        </div>
      </article>
      <article className={styles.category}>
       <h2>❌ 따라하지마 ! 액션영화</h2>
        <ActionCarousel />
        <h2>❌ 따라하지마 ! 범죄영화</h2>
        <CrimeCarousel />
        <h2>❌ 따라하지마 ! 로맨스영화</h2>
        <RomanceCarousel />
        <h2>❌ 따라하지마 ! 가족영화</h2>
        <FamilyCarousel />
      </article>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </section>
  /*  </motion.div> */
  );
};

export default Home;
