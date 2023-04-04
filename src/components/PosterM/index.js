import React from "react";
import { Link } from "react-router-dom";
import styles from "./poster.module.scss";
import { SolidHeartIcon } from "../../assets/icon";

const PosterM = ({ movie, onModalClick, onOver }) => {
  const { id, postImage, title } = movie;

  return (
    <section className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <button className={styles.heart}>
            <SolidHeartIcon />
          </button>
        </article>
        <Link to="/detail/{id}">
          <article
            className={styles.layerDown}
            onClick={onModalClick}
            onMouseOver={() => onOver(id)}
          >
            <img className={styles.postImage} src={postImage} alt={title} />
          </article>
        </Link>
      </div>
    </section>
  );
};
export default PosterM;
