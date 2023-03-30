import React from "react";
import styles from "./poster.module.scss";

const PosterM = (props) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.card} src={props.movie.postImage} alt="poster" />
    </div>
  );
};
export default PosterM;
