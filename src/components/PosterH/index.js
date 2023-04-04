import React from "react";
import styles from "./poster.module.scss";
import { SolidStarIcon } from "../../assets/icon";

const PosterH = ({ td , title , postImage , onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div
        className={styles.box}
      >
        <img className={styles.media} src={postImage} alt={title} />
        <div className={styles.rating}>
          <SolidStarIcon className={styles.star} />10점
        </div>
      </div>
    </div>
  );
};
export default PosterH;
