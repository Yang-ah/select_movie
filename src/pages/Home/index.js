import React from 'react';
import styles from './home.module.scss';
import RankingTitle from './RankingTitle';
import { RankingCarousel, HomeCarousel } from '../../components/Carousel';
import { motion } from 'framer-motion';
const Variants = {
  initial : {
    opacity : 0,
    y : 100,
    transition: {
      duration: 0.5,
    },
  },
  visible : {
    opacity : 1,
    y : 0,
    transition: {
      duration: 0.5,
    },
  },
}


const Home = () => {
  

  return (
    <section className={styles.wrapper}>
      <RankingTitle />
        <motion.div
        variants={Variants}
        initial="initial"
        animate="visible"
        >
      <article className={styles.ranking}>
        <RankingCarousel /> 
      </article>

      <article className={styles.category}>
        <h2 className={styles.genreTitle}>
          화끈한 스릴과 긴장감 넘치는 <span>액션 영화</span>
        </h2>
        <HomeCarousel GenreId="fc84777a-d713-4539-a5b9-8c24f0c85b99" />

        <h2 className={styles.genreTitle}>
          달콤한 감성으로 마음을 울리는 <span>로맨틱 영화</span>
        </h2>
        <HomeCarousel GenreId="73fa7e1d-0e3e-4506-9432-21c29faa8dd7" />

        <h2 className={styles.genreTitle}>
          묵직한 긴장감과 예측불허한 스릴의 <span>범죄 영화</span>
        </h2>
        <HomeCarousel GenreId="801c5056-0479-415c-b205-9daecad91b0e" />

        <h2 className={styles.genreTitle}>
          모든 가족 구성원이 함께 즐길 수 있는 <span>가족 영화</span>
        </h2>
        <HomeCarousel GenreId="1c9e16ec-920f-4975-b028-b4c681084f88" />

        <h2 className={styles.genreTitle}>
          웃음으로 스트레스를 날려버릴 <span>코미디 영화</span>
        </h2>
        <HomeCarousel GenreId="fb321f3a-0979-4329-8834-aa0f19ff928d" />

        <h2 className={styles.genreTitle}>
          타이트한 긴장감으로 당신을 위협하는 <span>스릴러 영화</span>
        </h2>
        <HomeCarousel GenreId="079e9098-ff7c-49c7-8d71-fe3fd066aafb" />

        <h2 className={styles.genreTitle}>
          당신의 상상력을 자극할 <span>판타지 영화</span>
        </h2>
        <HomeCarousel GenreId="360b5842-fc83-4ea9-a7fa-0d62017b975b" />
      </article>
      </motion.div>
    </section>
  );
};

export default Home;
