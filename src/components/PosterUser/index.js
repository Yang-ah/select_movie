import React from 'react';
import { Link } from 'react-router-dom';
import styles from './posterUser.module.scss';

import { SolidHeartIcon, SolidBookmarkIcon } from '../../assets/icon';

export const PosterUser = ({ index }) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{index?.title}</div>
          <button className={styles.icon}>
            <SolidHeartIcon />
          </button>
        </article>

        <Link to={`/detail/${index?.id}`}>
          <article className={styles.layerDown}>
            <img
              className={styles.postImage}
              src={index?.postImage}
              alt={index?.title}
            />
          </article>
        </Link>
      </div>
    </article>
  );
};
