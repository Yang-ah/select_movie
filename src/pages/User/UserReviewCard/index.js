import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './userReviewCard.module.scss';
import { SolidStarIcon, DoubleChevronRightIcon } from '../../../assets/icon';

const Review = ({ title, createdAt, movieId, content, score }) => {
  const navigate = useNavigate();
  const onClickComment = () => {
    navigate(`/detail/${movieId}`);
  };
  return (
    <section className={styles.screen}>
      <article className={styles.layerUp}>
        <div className={styles.lower} onClick={onClickComment}>
          <span className={styles.text}>자세히</span>
          <button className={styles.moveDetail} type="button" name="move">
            <DoubleChevronRightIcon className={styles.icon} />
          </button>
        </div>
      </article>
      <article className={styles.layerDown}>
        <aside className={styles.top}>
          <div className={styles.left}>
            <p className={styles.title}>{title}</p>
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.right}>
            <SolidStarIcon className={styles.star} />
            {score}
          </div>
        </aside>
        <div className={styles.content}>{content}</div>
      </article>
    </section>
  );
};
export default Review;
