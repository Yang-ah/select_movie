import React from "react";
import styles from "./poster.module.scss";
import { SolidHeartIcon } from "../../assets/icon";

const PosterM = ({ movie, onModalClick, onOver }) => {
  const { id, postImage, title, rating } = movie;
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.box}
        onClick={onModalClick}
        onMouseOver={() => onOver(id)}
      >
        <img className={styles.media} src={postImage} alt={title} />
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.heart}>
            <SolidHeartIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PosterM;
