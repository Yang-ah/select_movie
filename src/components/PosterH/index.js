import React from "react";
import styles from "./poster.module.scss";
import { SolidStarIcon } from "../../assets/icon";

const PosterH = ({ movie, onModalClick, onOver }) => {
  const { id, postImage, title, rating } = movie;
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.box}
        onClick={onModalClick}
        onMouseOver={() => onOver(id)}
      >
        <img className={styles.media} src={postImage} alt={title} />
        <div className={styles.rating}>
          <SolidStarIcon className={styles.star} />
          <p className={styles.aver}>{rating}</p>
        </div>
      </div>
    </div>
  );
};
export default PosterH;
