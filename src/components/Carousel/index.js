import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  getMoviesTop,
  getMovies,
  getMoviesMeLike,
  getBookmarksMe,
} from "../../api/Movies";
import { useNavigate } from "react-router-dom";
import "./carousel.scss";
import styles from "./myCarousel.module.scss";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SolidHeartIcon,
  SolidBookmarkIcon,
} from "../../assets/icon";

import PosterH from "../PosterH";
import { PosterHeart, PosterMark } from "../PosterM";
import MovieModal from "../../components/MovieModal";

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const HomeCarousel = () => {
  const navigate = useNavigate;
  const [moviesTop, setMoviesTop] = useState();
  const [isShow, setIsShow] = useState(false);

  const fetchMoviesTop = async () => {
    const response = await getMoviesTop();
    setMoviesTop(response.data);
  };

  useEffect(() => {
    fetchMoviesTop();
  }, []);

  const onModalClick = () => {
    setIsShow(true);
  };
  const onModalClose = () => {
    setIsShow(false);
  };

  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 5,
    prevArrow: <CaretLeftIcon />,
    nextArrow: <CaretRightIcon />,
  };

  return (
    <div>
      {moviesTop &&
        moviesTop.data.map((movie) => (
          <MovieModal
            key={movie.id}
            title={movie.title}
            id={movie.id}
            postImage={movie.postImage}
          />
        ))}
      <Slider {...settings}>
        {moviesTop &&
          moviesTop.data.map((movie) => (
            <PosterH
              key={movie.id}
              title={movie.title}
              id={movie.id}
              postImage={movie.postImage}
              score={movie.score}
              onClick={() => {
                onModalClick = { onModalClick };
                navigate(`/${movie.id}`, {
                  replace: true,
                });
              }}
            />
          ))}
      </Slider>
    </div>
  );
};

export const MyCarousel = () => {
  const navigate = useNavigate;
  const [moviesLike, setMoviesLike] = useState();
  const [moviesMark, setMoviesMark] = useState();

  const fetchMoviesLike = async () => {
    const response = await getMoviesMeLike();
    setMoviesLike(response.data);
    //    console.log(response.data[0].postImage);
  };
  const fetchMoviesMark = async () => {
    const response = await getBookmarksMe(1, 20);
    setMoviesMark(response.data);
  };

  useEffect(() => {
    fetchMoviesLike();
    fetchMoviesMark();
  }, []);

  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 4,
    prevArrow: <ChevronLeftIcon />,
    nextArrow: <ChevronRightIcon />,
  };

  return (
    <>
      <p>
        <SolidHeartIcon className={styles.myIcon} />
        내가 좋아하는 컨텐츠
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesLike &&
            moviesLike?.map((movie) => (
              <PosterHeart
                key={movie.id}
                title={movie.title}
                id={movie.id}
                postImage={movie.postImage}
                onClick={() => {
                  navigate(`/${movie.id}`, {
                    replace: true,
                  });
                }}
              />
            ))}
        </Slider>
      </div>

      <p>
        <SolidBookmarkIcon className={styles.myIcon} />
        내가 북마크 한 컨텐츠
      </p>
      {/* <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesMark &&
            moviesMark?.map((movie) => (
              <PosterMark
                key={movie.id}
                title={movie.title}
                id={movie.id}
                postImage={movie.postImage}
                onClick={() => {
                  navigate(`/detail/${movie.id}`, {
                    replace: true,
                  });
                }}
              />
            ))}
        </Slider>
      </div> */}
    </>
  );
};
