import React from 'react';
import { Link } from 'react-router-dom';
import styles from './poster.module.scss';

export const PosterM = ({ id, title, postImage, children, onClick }) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <button className={styles.icon} onClick={onClick}>
            {children}
          </button>
        </article>
        <Link to={`/detail/${id}`}>
          <article className={styles.layerDown}>
            <img className={styles.postImage} src={postImage} alt={title} />
          </article>
        </Link>
      </div>
    </article>
  );
};
