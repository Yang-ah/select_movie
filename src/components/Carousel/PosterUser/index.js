import React, { useEffect } from 'react';
import { deleteMovieLike } from '../../../api/Movies';
import { deleteBookmark } from '../../../api/Bookmarks';
import { SolidHeartIcon, SolidBookmarkIcon } from '../../../assets/icon';
import { useNavigate } from 'react-router-dom';
import styles from './posterUser.module.scss';
import useMe from '../../../hooks/useMe';

/** myPage, userPage Poster */
export const PosterUser = ({ type, index, callback }) => {
  const navigate = useNavigate();
  const onClickPoster = () => navigate(`/detail/${index?.id}`);

  const { me, onGetMe } = useMe();

  const offLike = async () => {
    await deleteMovieLike(index.id);
    callback && callback();
  };

  const offBookmark = async () => {
    await deleteBookmark(index.id);
    callback && callback();
  };

  const onClickIcon = async (e) => {
    if (!me) {
      return;
    }
    const { name } = e.currentTarget;

    if (name === 'unLike') {
      offLike();
    }
    if (name === 'unBookmark') {
      offBookmark();
    }
  };

  useEffect(() => {
    onGetMe();
  }, [index]);

  return (
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{index?.title}</div>
          <button name="unLike" onClick={onClickIcon}>
            {type === 'like' && <SolidHeartIcon className={styles.icon} />}
          </button>
          <button name="unBookmark" onClick={onClickIcon}>
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
