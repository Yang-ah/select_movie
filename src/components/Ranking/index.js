import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./ranking.module.scss";
import "./ranking.module.scss";
import PosterL from "../PosterH";

export const RankingCarousel = ({movies ,onModalClick, id }) => {
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

  return (
    <div className={styles.ranking}>
      <h2 className={styles.header}>💪최근 1~5위 영화를 살펴보세요💪</h2>
      <div className={styles.slider}>
        <Slider {...settings}>
          {movies.map((movie, idx) => (
            <div
              className={
                idx === slideIndex ? styles.slideActive : styles.slideBefore
              }>
              <PosterL
          key={movies.id}
          movie={movie}
          onModalClick={onModalClick}
        />
          
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
