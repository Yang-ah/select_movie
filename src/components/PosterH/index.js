import React, { useState } from "react";
import styles from "./poster.module.scss";
import { deleteMovieLike, getMovie, postMovieLike } from '../../api/Movies';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../atom';

import {
  HeartIcon,
  SolidHeartIcon,
  SolidStarIcon,
} from "../../assets/icon";

import Button from "../Common/Button";




const PosterH = ({ title , postImage , onModalClick , id  , rating}) => {

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
    // console.log('like', isLogin && response.data.isLiked);
  };

  const onClickButton = async (e) => {
    if (!isLogin) {
      return alert('로그인 후 이용 가능합니다!');
    }
    const { name } = e.currentTarget;

    if (name === 'isLiked') {
      isLiked ? await deleteMovieLike(movieId.id) : await postMovieLike(movieId.id);
      setIsLiked((cur) => !cur);
    }
  };

  return (
    <div className={styles.wrapper}  >
      <div className={styles.screen} onClick={() => onModalClick(id)}>
        <article className={styles.layerUp} >
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
        <article className={styles.layerDown} >
          <img className={styles.postImage} src={postImage} alt={title} />
        </article>
      </div>
    </div>
  );
};
export default PosterH;

// const PosterH = ({ title , postImage , onModalClick }) => {
//   return (
//     <div className={styles.wrapper} onClick={onModalClick}>
//       <div
//         className={styles.box}
//       >
//         <img className={styles.media} src={postImage} alt={title} />
//         <div className={styles.rating}>
//           <SolidStarIcon className={styles.star} />10점
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PosterH;
