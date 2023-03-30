import React from "react";
import Slider from "react-slick";
import Poster from "./Poster";
import {
  CaretLeftIcon,
  CaretRightIcon
} from "../../assets/icon";


export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

const MainCarousel = ({movies , onModalClick , onOver}) => {
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
    <div>
      <Slider {...settings}>
      {movies.map((movie) => (
        <Poster key={movies.id} movie={movie} onModalClick={onModalClick} onOver={onOver} />
      ))}
      </Slider>
    </div>
  );
}

export default MainCarousel;