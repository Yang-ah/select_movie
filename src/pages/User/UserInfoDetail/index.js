import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './infoDetail.module.scss';

import { getUserInfo } from '../../../api/Users';

const InfoDetail = () => {
  const userId = useParams();
  const [userData, setUserData] = useState();
  const fetchUserDetail = async () => {
    const response = await getUserInfo(userId.id);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserDetail();
  }, [userId]);

  return (
    <section className={styles.category}>
      <div className={styles.isliked}>
        <p className={styles.top}>💛 좋아요 표시한 영화 수 💛</p>
        <p className={styles.middle}>{userData?.likeCount}</p>
      </div>
      <div className={styles.rating}>
        <p className={styles.top}>⭐ 평균 평점 ⭐</p>
        {!!userData?.averageScore ? (
          <p className={styles.middle}>{userData?.averageScore.toFixed(1)}</p>
        ) : (
          <p className={styles.middle}>0</p>
        )}
      </div>
      <div className={styles.review}>
        <p className={styles.top}>✍ 내가 남긴 리뷰 수 ✍</p>
        <p className={styles.middle}>{userData?.reviewCount}</p>
      </div>
    </section>
  );
};
export default InfoDetail;
