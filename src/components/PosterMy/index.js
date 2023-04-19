import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './posterMy.module.scss';
import useMe from '../../hooks/useMe';
import { postMovieLike, deleteMovieLike } from '../../api/Movies';
import { postBookmark, deleteBookmark } from '../../api/Bookmarks';
import {
  SolidHeartIcon,
  HeartIcon,
  SolidBookmarkIcon,
  BookmarkIcon,
} from '../../assets/icon';

export const PosterHeart = ({ index, callback }) => {
  const { me, onGetMe } = useMe();
  const [isLiked, setIsLiked] = useState(true);
  const [like, setLike] = useState(false);

  const onLike = async () => {
    const response = await postMovieLike(index.id);
    setIsLiked(true);
  };
  const offLike = async () => {
    const response = await deleteMovieLike(index.id);
    setIsLiked(false);
    callback && callback();
  };

  const onClick = () => {
    !isLiked ? onLike() : offLike();
  };

  useEffect(() => {
    setIsLiked(index?.isLiked ?? false);
    onGetMe();
  }, [index]);

  useEffect(() => {
    setLike(isLiked);
    onGetMe();
  }, [isLiked]);

  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{index?.title}</div>
          <button onClick={onClick}>
            {like === true ? (
              <SolidHeartIcon className={styles.icon} />
            ) : (
              <HeartIcon className={styles.icon} />
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

export const PosterBookmark = ({ index, callback }) => {
  const { me, onGetMe } = useMe();
  const [isMarekd, setIsMarked] = useState(true);
  const [mark, setMark] = useState(true);
  const buttonRef = useRef();

  const onBookmark = async () => {
    const response = await postBookmark(index.id);
    setIsMarked(true);
  };

  const offBookmark = async () => {
    const response = await deleteBookmark(index.id);
    buttonRef.current.setIsMarked = false;
    callback && callback();
  };

  const onClick = () => {
    !isMarekd ? onBookmark() : offBookmark();
  };

  useEffect(() => {
    setIsMarked(index?.isMarekd ?? true);
    onGetMe();
  }, [index]);

  useEffect(() => {
    setMark(isMarekd);
    onGetMe();
  }, [isMarekd]);

  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{index?.title}</div>
          <button ref={buttonRef} onClick={onClick}>
            {mark === true ? (
              <SolidBookmarkIcon className={styles.icon} />
            ) : (
              <BookmarkIcon className={styles.icon} />
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
