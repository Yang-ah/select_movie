import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./ranking.module.scss";
import "./ranking.module.scss";

export const RankingCarousel = ({movies ,onModalClick}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dot: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3, //몇개씩 보여줌?,
    beforeChange: (current, next) => setSlideIndex(next),
  };
  const { id } = movies

  return (
    <div className={styles.ranking}>
      <h2 className={styles.header}>💪최근 1~5위 영화를 살펴보세요💪</h2>
      <div className={styles.slider}>
        <Slider {...settings}>
          {movies.map((movie, idx) => (
            <div
             onClick={() => onModalClick(id)}
              className={
                idx === slideIndex ? styles.slideActive : styles.slideBefore
              }
            >
              <img
                className={styles.media}
                src={movie.postImage}
                alt={movie.title}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
