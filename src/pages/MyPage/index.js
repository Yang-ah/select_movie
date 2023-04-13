import React from 'react';
import styles from './mypage.module.scss';

import Info from './Info';
import InfoDetail from './InfoDetail';
import { MyCarousel } from '../../components/Carousel';
import ReviewBox from './ReviewBox';

const MyPage = () => {
  return (
    <section className={styles.wrap}>
      <Info />
      <InfoDetail />
      <MyCarousel />
      <ReviewBox />
    </section>
  );
};
export default MyPage;
