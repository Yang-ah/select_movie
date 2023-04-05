import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getMoviesTop } from '../../api/Movies'
import { useNavigate } from "react-router-dom";
import "./carousel.scss";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../assets/icon";

import PosterH from "../PosterH";
import PosterM from "../PosterM";
import MovieModal from "../MovieModal";


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
  const [isShow, setIsShow] = useState(false);
  const [moviesTop, setMoviesTop] = useState({ data:[ ]});
  const [movieId , setMovieId] = useState(null);

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
    setMovieId(moviesTop.data[num]) //data값에 아이디값 대입 
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
    {isShow && (
          <MovieModal 
            onModalClose={onModalClose}
            onModalClick={onModalClick}
            movieId ={movieId}
          />
        )
    }
      <Slider {...settings}>
        {moviesTop?.data.map((movie) => (
          <PosterH
          key={movie.id}
          title={movie.title}
          id={movie.id}
          postImage={movie.postImage}
          onModalClick={onModalClick}
          movieId ={movieId}
          />
        ))}
      </Slider>
    </div>
  );
};



export const MyCarousel = ({ movies, onModalClick }) => {
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
    <Slider {...settings}>
      {movies.map((movie) => (
        <PosterM
          key={movies.id}
          movie={movie}
          onModalClick={onModalClick}
        />
      ))}
    </Slider>
  );
};
