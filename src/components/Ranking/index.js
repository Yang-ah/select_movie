import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./ranking.module.scss";
import "./ranking.module.scss";
import mdata from "../../mock_movie.json";

export const RankingCarousel = () => {
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
    <div className={styles.wrapper}>
      <h2 className={styles.header}>최근 1~5위 영화를 살펴보세요</h2>
      <div className={styles.slider}>
        <Slider {...settings}>
          {mdata.map((movie, id) => (
            <div
              className={
                id === slideIndex ? styles.slideActive : styles.slideBefore
              }
            >
              <img
                className={styles.img}
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
