import React from "react";
import styles from "./poster.module.scss";
import { SolidStarIcon, SolidHeartIcon } from "../../assets/icon";



const PosterH = ({ title , postImage , onModalClick , id  , rating}) => {
  return (
    <div className={styles.wrapper} onClick={() => onModalClick(id)} >
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <div className={styles.bottom}>
            <div className={styles.rating}>
              <SolidStarIcon className={styles.star} />
              {rating}
            </div>
            <button className={styles.heart}>
              <SolidHeartIcon />
            </button>
          </div>
        </article>
        <article className={styles.layerDown} >
          <img className={styles.postImage} src={postImage} alt={title} />
        </article>
      </div>
    </div>
  );
};
export default PosterH;
