import React, { useState } from 'react';
import styles from './posterRanking.module.scss';
import { SolidStarIcon } from '../../assets/icon';

const PosterRanking = ({ title, postImage, onModalClick, id, movie }) => {
  const [getAver, setGetAver] = useState(movie.averageScore);

  return (
    <div className={styles.wrapper} onClick={() => onModalClick(id)}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <div className={styles.bottom}>
            <div className={styles.rating}>
              <SolidStarIcon className={styles.star} />
              <p className={styles.starNum}>{getAver?.toFixed(1)}</p>
            </div>
          </div>
        </article>
        <article className={styles.layerDown}>
          <img className={styles.postImage} src={postImage} alt={title} />
        </article>
      </div>
    </div>
  );
};
export default PosterRanking;
