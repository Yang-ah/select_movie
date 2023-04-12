import React, { useEffect, useState } from 'react';
import styles from './poster.module.scss';
import { getMovie, postMovieLike, deleteMovieLike } from '../../api/Movies';

import {
  SolidStarIcon,
  HeartIcon,
  SolidHeartIcon,
} from '../../assets/icon';

export const PosterH = ({ movie, id, onModalClick, callback }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(false);
  const [getAver , setGetAver] = useState(movie.averageScore) 

  console.log(getAver)


  const postLike = async () => {
    const response = await postMovieLike(movie.id);
    setIsLiked(true);
  };
  const deleteLike = async () => {
    const response = await deleteMovieLike(movie.id);
    setIsLiked(false);
    callback && callback();
  };

  const onButtonClick = () => {
    !isLiked ? postLike() : deleteLike();
  };

  useEffect(() => {
    setIsLiked(movie?.isLiked ?? false);
  }, [movie]);

  useEffect(() => {
    setLike(isLiked);
  }, [isLiked]);


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
          <p ㅊㅁ>{getAver?.toFixed(1)}</p>
          </div>
          <button className={styles.icon} onClick={onButtonClick}>
            {like === true ? (
              <SolidHeartIcon height={'35px'} fill="red" />
            ) : (
              <HeartIcon height={'35px'} fill="red" />
            )}
          </button>
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

{
  /*
const PosterH = ({ title, postImage, onModalClick, id, rating }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const [movieDetail, setMovieDetail] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const fetchMovieData = async () => {
    const response = await getMovie(id);
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
      isLiked
        ? await deleteMovieLike(movieId.id)
        : await postMovieLike(movieId.id);
      setIsLiked((cur) => !cur);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.screen} onClick={() => onModalClick(id)}>
        <article className={styles.layerUp}>
          <div className={styles.title}>{title}</div>
          <div className={styles.bottom}>
            <div className={styles.rating}>
              <SolidStarIcon className={styles.star} />
              {rating}
            </div>
            <Button
              option="secondary"
              name="isLiked"
              className={styles.button}
              onClick={onClickButton}
            >
              {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
            </Button>
          </div>
        </article>
        
        <article className={styles.layerDown}>
          <img className={styles.postImage} src={postImage} alt={title} />
        </article>
      </div>
    </div>
  );
};
export default PosterH;
*/
}
