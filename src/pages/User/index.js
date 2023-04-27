import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './user.module.scss';
import UserInfo from './UserInfo';
import UserInfoDetail from './UserInfoDetail';
import { UserCarousel } from '../../components';
import UserReview from './UserReview';
import { getUserDetail } from '../../api/Users';

const User = () => {
  const userId = useParams();
  const [userData, setUserData] = useState();

  const fetchUserDetail = async () => {
    const response = await getUserDetail(userId.id);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <section className={styles.wrap}>
      <UserInfo />
      <UserInfoDetail />
      <article className={styles.contents}>
        <p className={styles.textWrap}>
          <span className={styles.text}>
            {userData?.nickname} 님이 좋아하는 컨텐츠
          </span>
        </p>
        <UserCarousel name="userLike" />
      </article>
      <article className={styles.contents}>
        <p className={styles.textWrap}>
          <span className={styles.text}>
            {userData?.nickname} 님이 북마크 한 컨텐츠
          </span>
        </p>
        <UserCarousel name="userMark" />
      </article>
      <article className={styles.contents}>
        <p className={styles.textWrap}>
          <span className={styles.text}>
            {userData?.nickname} 님이 작성한 리뷰
          </span>
        </p>
        <UserReview />
      </article>
    </section>
  );
};

export default User;
