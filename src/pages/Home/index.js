import React from 'react';
import styles from './home.module.scss';
import { RankingCarousel } from '../../components';
import {
  ActionCarousel,
  CrimeCarousel,
  FamilyCarousel,
  RomanceCarousel,
} from '../../components/Carousel2';

const Home = () => {
  return (
    /* <motion.div
    animate={{y : 100}}
  > */
    <section className={styles.wrapper}>
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
    </section>
    /*  </motion.div> */
  );
};

export default Home;
