import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./poster.module.scss";
import { SolidHeartIcon, SolidBookmarkIcon } from "../../assets/icon";

export const PosterHeart = ({ id, title, postImage, onClick }) => {
  //  console.log("postImage", postImage);
  return (
    <div className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <button className={styles.icon}>
            <SolidHeartIcon height="24px" />
          </button>
        </article>
        <Link to={`/detail/${id}`}>
          <article className={styles.layerDown} onClick={onClick}>
            <img className={styles.postImage} src={postImage} alt={title} />
          </article>
        </Link>
      </div>
    </div>
  );
};

export const PosterMark = ({ id, title, postImage, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <button className={styles.icon}>
            <SolidBookmarkIcon height="22px" />
          </button>
        </article>

        <Link to={`/detail/${id}`}>
          <article className={styles.layerDown} onClick={onClick}>
            <img className={styles.postImage} src={postImage} alt={title} />
          </article>
        </Link>
      </div>
    </div>
  );
};
