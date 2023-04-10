import React, { useState } from 'react';
import styles from './mypage.module.scss';

import Info from './InfoBox';
import { MyCarousel, ReviewCarousel } from '../../components/Carousel';
import Comments from './CommentBox';

const MyPage = () => {
  const [movies] = useState();
  const [movieInfo, setMovieInfo] = useState([0]);
  const [isShow, setIsShow] = useState(false);

  const onClick = (id) => {
    const num = movies.findIndex((item) => item.id === id);
    setMovieInfo(movies[num]);
    setIsShow(true);
  };

  return (
    <section className={styles.wrap}>
      <Info />
      <div className={styles.content}>
        <p className={styles.fix}>components/Carousel/두번째(좋아요,북마크)</p>
        <MyCarousel movieInfo={movieInfo} onClick={onClick} />
      </div>
      <div className={styles.comment}>
        <p className={styles.fix}>components/Carousel/세번째(리뷰1)</p>
        <ReviewCarousel />
      </div>
      <div className={styles.comment}>
        <p className={styles.fix}>pages/MyPage/CommentBox(리뷰2)</p>
        <Comments />
      </div>
    </section>
  );
};

export default MyPage;
