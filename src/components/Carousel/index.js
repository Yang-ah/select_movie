import { sliderClasses } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

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

const Carousel = () => {
  const [position, setPosition] = useState(false);
  const slider = useRef();

  useEffect(() => {
    if (sliderClasses.current && !position) {
      sliderClasses.current.slickGoTo();
      setPosition(true);
    }
  }, [position, slider]);

  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600, //다음 스피드
    slidesToShow: 8, //몇개씩 보여줌?
    slidesToScroll: 6, //몇개씩 넘어감?

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      {data.map((movie) => (
        <Poster movie={movie} />
      ))}
    </Slider>
  );
};

export default Carousel;
