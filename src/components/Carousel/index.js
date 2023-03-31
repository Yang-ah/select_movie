import React from "react";
import Slider from "react-slick";
import "./carousel.scss";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../assets/icon";

import PosterH from "../PosterH";
import PosterM from "../PosterM";

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const HomeCarousel = ({ movies, onModalClick, onOver }) => {
  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600,
    slidesToShow: 8,
    slidesToScroll: 7,
    prevArrow: <CaretLeftIcon />,
    nextArrow: <CaretRightIcon />,
  };

  return (
    <div>
      <Slider {...settings}>
        {movies.map((movie) => (
          <PosterH
            key={movies.id}
            movie={movie}
            onModalClick={onModalClick}
            onOver={onOver}
          />
        ))}
      </Slider>
    </div>
  );
};

export const MyCarousel = ({ movies, onModalClick, onOver }) => {
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
          onOver={onOver}
        />
      ))}
    </Slider>
  );
};
