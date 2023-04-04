import React from "react";
import styles from "./poster.module.scss";
import { SolidStarIcon } from "../../assets/icon";

const PosterL = ({ title , postImage , onModalClick }) => {

  return (
    <div className={styles.wrapper} onClick={onModalClick}>
      <div
        className={styles.box}
      >
        <img className={styles.media} src={postImage} alt={title} />
        <div className={styles.rating}>
          <SolidStarIcon className={styles.star} />\
        </div>
      </div>
    </div>
  );
};
export default PosterL;
