import React from "react";
import styles from "./review.module.scss";
import { SolidStarIcon, ThumbsUpIcon, ThumbsDownIcon } from "../../assets/icon";

const Review = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.card} />
        <top className={styles.top}>
          <div className={styles.left}>
            <p className={styles.title}>{props.review.title}</p>
            <p className={styles.date}>{props.review.date}</p>
          </div>
          <div className={styles.rating}>
            <SolidStarIcon className={styles.star} />
            {props.review.rating}
          </div>
        </top>
        <main>
          <p className={styles.comment}>{props.review.comment}</p>
        </main>
        <bottom className={styles.bottom}>
          <span className={styles.upDown}>
            <div className={styles.up}>
              <ThumbsUpIcon />
              {props.review.liked_up}
            </div>
            <div className={styles.down}>
              <ThumbsDownIcon />
              {props.review.liked_down}
            </div>
          </span>
        </bottom>
      </div>
    </div>
  );
};
export default Review;
