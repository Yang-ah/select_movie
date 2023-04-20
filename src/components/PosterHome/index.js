import React, { useState, useEffect } from 'react';
import styles from './posterRanking.module.scss';

import { getMovie, postMovieLike, deleteMovieLike } from '../../api/Movies';
import { SolidStarIcon, HeartIcon, SolidHeartIcon } from '../../assets/icon';
import Button from '../Common/Button';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../status';

export const PosterRanking = ({
  title,
  postImage,
  onModalClick,
  id,
  movie,
}) => {
  const [getAver, setGetAver] = useState(movie.averageScore);
  return (
    <div className={styles.wrapperR} onClick={() => onModalClick(id)}>
      <div className={styles.screenR}>
        <article className={styles.layerUpR}>
          <div className={styles.titleR}>{title}</div>
          <div className={styles.bottomR}>
            <div className={styles.ratingR}>
              <SolidStarIcon className={styles.starR} />
              <p className={styles.starNumR}>{getAver?.toFixed(1)}</p>
            </div>
          </div>
        </article>
        <article className={styles.layerDownR}>
          <img className={styles.postImageR} src={postImage} alt={title} />
        </article>
      </div>
    </div>
  );
};

export const PosterCategory = ({ movie, id, onModalClick, callback }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const [movieDetail, setMovieDetail] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [getAver, setGetAver] = useState(movie.averageScore);

  const fetchMovieData = async () => {
    const response = await getMovie(movie.id);
    setMovieDetail(response.data);

    if (isLogin) {
      setIsLiked(response.data.isLiked);
    } else {
      setIsLiked(false);
    }
  };

  const onClickButton = async (e) => {
    if (!isLogin) {
      return alert('로그인 후 이용 가능합니다!');
    }
    const { name } = e.currentTarget;

    if (name === 'isLiked') {
      isLiked ? await deleteMovieLike(movie.id) : await postMovieLike(movie.id);
      setIsLiked((cur) => !cur);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [movie.id]);

  return (
    <article className={styles.wrapperH}>
      <div className={styles.screenH}>
        <article className={styles.layerUpH}>
          <div
            className={styles.titleH}
            onClick={() => onModalClick(movie?.id)}
          >
            {movie?.title}
          </div>
          <div className={styles.bodyContentsH}>
            <div className={styles.ratingH}>
              <SolidStarIcon
                className={styles.starH}
                height={'30px'}
                fill="yellow"
              />
              <p className={styles.starNumH}>{getAver?.toFixed(1)}</p>
            </div>
            <Button
              option="third"
              name="isLiked"
              className={styles.iconH}
              onClick={onClickButton}
            >
              {isLiked ? (
                <SolidHeartIcon height={'35px'} fill="red" />
              ) : (
                <HeartIcon height={'35px'} fill="red" />
              )}
            </Button>
          </div>
        </article>
        <article className={styles.layerDownH}>
          <img
            className={styles.postImageH}
            src={movie?.postImage}
            alt={movie?.title}
          />
        </article>
      </div>
    </article>
  );
};
