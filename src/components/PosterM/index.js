import React from "react";
import styles from "./poster.module.scss";

const PosterM = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.card} />
        <img
          className={styles.media}
          src={props.movie.postImage}
          alt={props.movie.title}
        />
      </div>
    </div>
  );
};
export default PosterM;
