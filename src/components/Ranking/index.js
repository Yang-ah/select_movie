import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './ranking.module.scss';
import './ranking.module.scss';
import mdata from '../../mock_movie.json';

export const RankingCarousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    className: 'center',
    centerMode: true,
    centerPadding: '0px',
    dot: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2400,
    slidesToShow: 3, //몇개씩 보여줌?,

    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.header}>최근 1~5위 영화를 살펴보ㅅ</h2>
      <div className={styles.slider}>
        <Slider {...settings}>
          {mdata.map((movie, i) => (
            <div
              className={i === slideIndex ? 'slide slide:active' : 'slide'}
              key={i}
            >
              <div className={styles.box}>
                <img
                  className={styles.media}
                  src={movie.postImage}
                  alt={movie.title}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
