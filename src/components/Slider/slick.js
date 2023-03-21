import React from "react";
import Slider from "react-slick";
import "./slick.scss";
import data from "../../mock.json";
import Poster from "../Poster";

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export const SlickSlider = () => {
  const settings = {
    arrow: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    speed: 600, //다음 스피드
    slidesToShow: 8, //몇개씩 보여줌?
    slidesToScroll: 8, //몇개씩 넘어감?

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map((movie) => (
        <Poster movie={movie} />
      ))}
    </Slider>
  );
};
