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
          onClick={() => {
            onModalClick={onModalClick}
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
