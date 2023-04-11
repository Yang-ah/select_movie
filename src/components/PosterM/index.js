import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './poster.module.scss';
import { postMovieLike, deleteMovieLike } from '../../api/Movies';
import { postBookmark, deleteBookmark } from '../../api/Bookmarks';
import {
  SolidHeartIcon,
  HeartIcon,
  SolidBookmarkIcon,
  BookmarkIcon,
} from '../../assets/icon';

export const PosterM = ({ id, title, postImage }) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <button className={styles.icon}>
            <SolidBookmarkIcon />
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

export const PosterHeart = ({ index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(false);

  const postLike = async () => {
    const response = await postMovieLike(index.id);
    setIsLiked(true);
  };
  const deleteLike = async () => {
    const response = await deleteMovieLike(index.id);
    setIsLiked(false);
  };

  const onClick = () => {
    isLiked === false ? postLike() : deleteLike();
  };

  useEffect(() => {
    setIsLiked(index?.isLiked ?? false);
  }, [index]);

  useEffect(() => {
    setLike(isLiked);
  }, [isLiked]);

  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{index?.title}</div>
          <button className={styles.click} onClick={onClick}>
            {like === true ? (
              <SolidHeartIcon height={'20px'} fill="red" />
            ) : (
              <HeartIcon height={'20px'} fill="red" />
            )}
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

export const PosterBookmark = ({ index }) => {
  const [isMarekd, setIsMarked] = useState(false);
  const [mark, setMark] = useState(false);

  const onCreateBookmark = async () => {
    const response = await postBookmark(index.id);
    if (response.status === 201) {
      console.log('생성');
      setIsMarked(true);
      callback && callback();
    }
  };

  const onDeleteBookmark = async () => {
    const response = await deleteBookmark(index.id);
    if (response.status === 204) {
      console.log('삭제');
      setIsMarked(false);
      callback && callback();
    }
  };

  const onLikeBtn = () => {
    isMarekd === false ? onCreateBookmark() : onDeleteBookmark();
  };

  useEffect(() => {
    setIsMarked(index?.isMarekd ?? false);
  }, [index]);

  useEffect(() => {
    setLike(isMarekd);
  }, [isMarekd]);

  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{index?.title}</div>
          <button className={styles.click} onClick={onLikeBtn}>
            {mark === true ? (
              <SolidBookmarkIcon height={'20px'} fill="red" />
            ) : (
              <BookmarkIcon height={'20px'} fill="red" />
            )}
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
