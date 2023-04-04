import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviesTop } from '../../api/Movies'
import Slider from "react-slick";
import styles from "./ranking.module.scss";
import PosterL from "../PosterL";


export const RankingCarousel = () => {

    const navigate = useNavigate;
  const [moviesTop, setMoviesTop] = useState();

  const fetchMoviesTop = async () => {
    const response = await getMoviesTop();
    setMoviesTop(response.data);
  };
  
  useEffect(() => {
    fetchMoviesTop();
  }, []);

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
          {moviesTop &&
           moviesTop.data.map((movie, idx) => (
            <div
              className={
                idx === slideIndex ? styles.slideActive : styles.slideBefore
              }>
              <PosterL
          key={movie.id}
          title={movie.title}
          id={movie.id}
          postImage={movie.postImage}
        />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
