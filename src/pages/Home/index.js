import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import mdata from "../../mock_movie.json";
import { RankingCarousel, HomeCarousel } from "../../components";
import MovieModal from "../../components/MovieModal";
import { getMovies } from "../../api/Movies";

const Home = ({ id }) => {

  const [movies] = useState(mdata);
  const [movieInfo, setMovieInfo] = useState(movies[0]);
  const [isShow, setIsShow] = useState(false);

  const onModalClick = (id) => {
    const num = movies.findIndex((item) => item.id === id);
    setMovieInfo(movies[num]);
    setIsShow(true);
  };
  const onModalClose = () => {
    setIsShow(false);
  };
  
  /*

  const [moviedata , setMovieData] = useState();

  const responseData = async (i)=>{
      const response1 = await getMovies(1,20);
    
      setMovieData({
          id : response1.data.data[i].id,
          title : response1.data.data[i].title,
          releasedAt : response1.data.data[i].releasedAt,
          averageScore : response1.data.data[i].averageScore,
      })
    }
    useEffect(()=>{
      responseData();
    },[1]);  */
 
  return (
    <section className={styles.wrapper}>
      <MovieModal
        setIsShow={setIsShow}
        isShow={isShow}
        onModalClose={onModalClose}
        movieInfo={movieInfo}
      ></MovieModal>
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
    </section>

  );
};

export default Home;
