import React from "react";
import Slider from "react-slick";

import { CaretLeftIcon, CaretRightIcon } from "../../assets/icon";
import data from "../../mock.json";
import Poster from "../Poster";

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const HomeCarousel = () => {
  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600, //다음 스피드
    slidesToShow: 8, //몇개씩 보여줌?
    slidesToScroll: 6, //몇개씩 넘어감?
    prevArrow: <CaretLeftIcon />,
    nextArrow: <CaretRightIcon />,
  };

  return (
    <Slider {...settings}>
      {data.map((movie) => (
        <Poster movie={movie} />
      ))}
    </Slider>
  );
};
