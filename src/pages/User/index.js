import React from 'react';
import styles from './user.module.scss';
import UserInfo from './UserInfo';
import UserInfoDetail from './UserInfoDetail';
import { UserCarousel } from '../../components/Carousel';
import UserReview from './UserReview';

const User = () => {
  return (
    <section className={styles.wrap}>
      <UserInfo />
      <UserInfoDetail />
      <UserCarousel />
      <UserReview />
    </section>
  );
};

export default User;
