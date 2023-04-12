import React, { useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './mypage.module.scss';

import Info from './InfoBox';
import { MyCarousel } from '../../components/Carousel';
import ReviewBox from './ReviewBox';

const MyPage = () => {
  const { id } = useParams();
  const ref = useRef(null);
  const [movies] = useState();
  const [movieInfo, setMovieInfo] = useState([0]);
  const [reviews] = useState();
  const [reviewInfo, setReviewInfo] = useState([0]);
  const [isShow, setIsShow] = useState(false);

  const onMovieClick = (id) => {
    const num = movies.findIndex((item) => item.id === id);
    setMovieInfo(movies[num]);
    setIsShow(true);
  };
  const onReviewClick = (id) => {
    const num = reviews.findIndex((item) => item.id === id);
    setReviewInfo(reviews[num]);
    setIsShow(true);
  };

  return (
    <section className={styles.wrap}>
      <Info />
      <MyCarousel onClick={onMovieClick} />
      <ReviewBox />
    </section>
  );
};

export default MyPage;
