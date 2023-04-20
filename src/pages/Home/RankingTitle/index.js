import React from 'react';
import styles from './rankingTitle.module.scss';

const RankingTitle = () => {
  return (
    <article className={styles.titleWrapper}>
      <div className={styles.titleBox}>
        <div className={styles.title}>Movie Selector</div>
        <div className={styles.caption}>리뷰가 살아숨쉬는 공간</div>
      </div>
    </article>
  );
};

export default RankingTitle;
