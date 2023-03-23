import Carousel from "../../components/Carousel";
import React from "react";
import styles from "./home.module.scss";

const Category = () => {
  return (
    <div className={styles.categoryWrapper}>
      <div>🔥 개봉 예정 🔥</div>
      <Carousel />
      <div>👀 오늘 이거 볼래? 👀</div>
      <Carousel />
    </div>
  );
};

export default Category;
