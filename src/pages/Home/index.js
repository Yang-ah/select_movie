import React, { useState } from "react";
import styles from "./home.module.scss";
import mdata from "../../mock_movie.json";
import { RankingCarousel, HomeCarousel } from "../../components";
import ModalMovie from "../../components/ModalMovie";

const Home = () => {
  const [movies] = useState(mdata);
  const [movieInfo, setMovieInfo] = useState(movies[0]);
  const [isShow, setIsShow] = useState(false);

  const onModalClick = (id) => {
    const num = movies.findIndex((item) => item.id === id);
    setMovieInfo(movies[num]);
    setIsShow(true);
    document.body.classList.add("modal_overlay");
    document.body.classList.add("modal-open");
  };
  const onModalClose = () => {
    setIsShow(false);
    document.body.classList.remove("modal_overlay");
    document.body.classList.remove("modal-open");
  };

  return (
    <section className={styles.wrapper}>
      <article className={styles.ranking}>
        <div>
          <RankingCarousel
            movieInfo={movieInfo}
            movies={movies}
            onModalClick={onModalClick}
          />
        </div>
      </article>
      <article className={styles.category}>
        <h2>🔥 개봉 예정 🔥</h2>
        <HomeCarousel
          movieInfo={movieInfo}
          movies={movies}
          onModalClick={onModalClick}
        />
        <h2>👀 오늘 이거 볼래? 👀</h2>
        <HomeCarousel
          movieInfo={movieInfo}
          movies={movies}
          onModalClick={onModalClick}
        />
      </article>
      <ModalMovie
        setIsShow={setIsShow}
        isShow={isShow}
        onModalClose={onModalClose}
        movieInfo={movieInfo}
      ></ModalMovie>
    </section>
  );
};

export default Home;
