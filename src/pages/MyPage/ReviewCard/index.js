import React from 'react';
import { Link } from 'react-router-dom';
import styles from './reviewCard.module.scss';
import { SolidStarIcon, ModifyIcon, TrashIcon } from '../../../assets/icon';

const Review = ({
  id,
  title,
  content,
  createdAt,
  score,
  showFixModal,
  showDeleteModal,
}) => {
  return (
    <section className={styles.screen}>
      <article className={styles.layerUp}>
        <button className={styles.fixModal} onClick={showFixModal}>
          <ModifyIcon className={styles.icon} />
        </button>
        <button className={styles.deleteModal} onClick={showDeleteModal}>
          <TrashIcon className={styles.icon} />
        </button>
      </article>
      <article className={styles.layerDown}>
        <aside className={styles.top}>
          <div className={styles.left}>
            <p className={styles.title}>title : {title}</p>
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.right}>
            <SolidStarIcon className={styles.star} />
            {score}
          </div>
        </aside>
        <p className={styles.content}>{content}</p>
      </article>
    </section>
  );
};

export default Review;
