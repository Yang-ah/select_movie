import { SlickSlider } from "./slick";
import React from "react";

function MovieScroll() {
  return (
    <div className="slider">
      <div>🔥 개봉 예정 🔥</div>
      <SlickSlider />
      <div>👀 오늘 이거 볼래? 👀</div>
      <SlickSlider />
    </div>
  );
}

export default MovieScroll;
