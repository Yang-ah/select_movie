import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getMoviesTop } from '../../api/Movies';
import { useNavigate } from 'react-router-dom';
import styles from './ranking.module.scss';

import PosterL from '../PosterL';
import MovieModal from '../MovieModal';

export const RankingCarousel = () => {
  const navigate = useNavigate;
  const [isShow, setIsShow] = useState(false);
  const [moviesTop, setMoviesTop] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesTop = async () => {
    const response = await getMoviesTop();
    setMoviesTop(response.data);
  };

  useEffect(() => {
    fetchMoviesTop();
  }, []);

  const onModalClick = (id) => {
    const num = moviesTop.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesTop.data[num]); //data값에 아이디값 대입
  };

  const onModalClose = () => {
    setIsShow(false);
  };

  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dot: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3, //몇개씩 보여줌?,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <>
      {isShow && (
        <MovieModal
          onModalClose={onModalClose}
          onModalClick={onModalClick}
          movieId={movieId}
        />
      )}
      <div className={styles.ranking}>
        <h2 className={styles.header}>💪최근 1~5위 영화를 살펴보세요💪</h2>
        <div className={styles.slider}>
          <Slider {...settings}>
            {moviesTop &&
              moviesTop.data.map((movie, idx) => (
                <div
                  className={
                    idx === slideIndex ? styles.slideActive : styles.slideBefore
                  }
                >
                  <PosterL
                    key={movie.id}
                    title={movie.title}
                    id={movie.id}
                    postImage={movie.postImage}
                    onModalClick={onModalClick}
                    movieId={movieId}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
