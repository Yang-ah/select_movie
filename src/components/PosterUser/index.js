import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './posterMy.module.scss';
import useMe from '../../hooks/useMe';
import { postMovieLike, deleteMovieLike } from '../../api/Movies';
import { postBookmark, deleteBookmark } from '../../api/Bookmarks';
import { SolidHeartIcon, SolidBookmarkIcon } from '../../assets/icon';

//NOTE: 쓰이는 곳 폴더에 넣는 것이 더 좋습니다.

export const PosterUser = ({ type, index, callback }) => {
  const navigate = useNavigate();
  const onClickPoster = () => {
    navigate(`/detail/${index?.id}`);
  };

  const { me, onGetMe } = useMe();
  const [isLiked, setIsLiked] = useState(true);
  const [like, setLike] = useState(true);
  const [isMarekd, setIsMarked] = useState(true);
  const [mark, setMark] = useState(true);

  const onLike = async () => {
    const response = await postMovieLike(index.id);
    setIsLiked(true);
  };
  const offLike = async () => {
    const response = await deleteMovieLike(index.id);
    setIsLiked(false);
    callback && callback();
  };

  const onBookmark = async () => {
    const response = await postBookmark(index.id);
    setIsMarked(true);
  };
  const offBookmark = async () => {
    const response = await deleteBookmark(index.id);
    setIsMarked(false);
    callback && callback();
  };

  const onCLickIcon = async (e) => {
    if (!me) {
      return;
    }
    const { name } = e.currentTarget;
    if (name === 'unLike') {
      !isLiked ? onLike() : offLike();
    }
    if (name === 'unBookmark') {
      !isMarekd ? onBookmark() : offBookmark();
    }
  };

  useEffect(() => {
    setIsLiked(index?.isLiked ?? true);
    setLike(isLiked);
    setIsMarked(index?.isMarekd ?? true);
    setMark(isMarekd);
    onGetMe();
  }, [index, isLiked, isMarekd]);

  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{index?.title}</div>
          <button name="unLike" onClick={onCLickIcon}>
            {type === 'like' && <SolidHeartIcon className={styles.icon} />}
          </button>
          <button name="unBookmark" onClick={onCLickIcon}>
            {type === 'mark' && <SolidBookmarkIcon className={styles.icon} />}
          </button>
        </article>

        <article className={styles.layerDown} onClick={onClickPoster}>
          <img
            className={styles.postImage}
            src={index?.postImage}
            alt={index?.title}
          />
        </article>
      </div>
    </article>
  );
};
