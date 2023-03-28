import React from "react";
import Slider from "react-slick";
import "./carousel.scss";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../assets/icon";
import mdata from "../../mock_movie.json";

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

export const RankingCarousel = () => {
  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600, //다음 스피드
    slidesToShow: 8, //몇개씩 보여줌?
    slidesToScroll: 7, //몇개씩 넘어감?
    prevArrow: <CaretLeftIcon />,
    nextArrow: <CaretRightIcon />,
  };

  return (
    <Slider {...settings}>
      {mdata.map((movie) => (
        <PosterH movie={movie} />
      ))}
    </Slider>
  );
};
export const HomeCarousel = () => {
  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600, //다음 스피드
    slidesToShow: 8, //몇개씩 보여줌?
    slidesToScroll: 7, //몇개씩 넘어감?
    prevArrow: <CaretLeftIcon />,
    nextArrow: <CaretRightIcon />,
  };

  return (
    <Slider {...settings}>
      {mdata.map((movie) => (
        <PosterH movie={movie} />
      ))}
    </Slider>
  );
};
export const MyCarousel = () => {
  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600, //다음 스피드
    slidesToShow: 6, //몇개씩 보여줌?
    slidesToScroll: 4, //몇개씩 넘어감?
    prevArrow: <ChevronLeftIcon />,
    nextArrow: <ChevronRightIcon />,
  };

  return (
    <Slider {...settings}>
      {mdata.map((movie) => (
        <PosterM movie={movie} />
      ))}
    </Slider>
  );
};
