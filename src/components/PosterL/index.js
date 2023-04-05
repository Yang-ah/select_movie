import React from "react";
import styles from "./poster.module.scss";

const PosterL = ({ title, postImage, onModalClick }) => {
  return (
    <div className={styles.wrapper} onClick={onModalClick}>
      <div className={styles.box}>
        <img className={styles.media} src={postImage} alt={title} />
      </div>
    </div>
  );
};
export default PosterL;
