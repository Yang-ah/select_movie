import React, { useEffect, useState } from 'react';
import styles from './posterHome.module.scss';
import { getMovie, postMovieLike, deleteMovieLike } from '../../api/Movies';

import { SolidStarIcon, HeartIcon, SolidHeartIcon } from '../../assets/icon';

import Button from '../Common/Button';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../status';

export const PosterHome = ({ movie, id, onModalClick, callback }) => {
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
    <article className={styles.wrapper}>
      <div className={styles.screen}>
        <article className={styles.layerUp}>
          <div className={styles.title} onClick={() => onModalClick(movie?.id)}>
            {movie?.title}
          </div>
          <div className={styles.bodyContents}>
            <div className={styles.rating}>
              <SolidStarIcon
                className={styles.star}
                height={'30px'}
                fill="yellow"
              />
              <p className={styles.starNum}>{getAver?.toFixed(1)}</p>
            </div>
            <Button
              option="third"
              name="isLiked"
              className={styles.icon}
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
        <article className={styles.layerDown}>
          <img
            className={styles.postImage}
            src={movie?.postImage}
            alt={movie?.title}
          />
        </article>
      </div>
    </article>
  );
};

export default PosterHome;
