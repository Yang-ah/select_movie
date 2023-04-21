import React, { useEffect, useState } from 'react';
import { getUsersMeInfo } from '../../../api/Users';
import styles from './infoDetail.module.scss';

const InfoDetail = () => {
  const [userInfoDetail, setUserInfoDetail] = useState();

  const fetchUserInfoDetail = async () => {
    const response = await getUsersMeInfo();
    setUserInfoDetail(response.data);
  };

  useEffect(() => {
    fetchUserInfoDetail();
  }, []);

  return (
    <section className={styles.category}>
      <div className={styles.isliked}>
        <p className={styles.top}>💛 좋아요 표시한 영화 수 💛</p>
        <p className={styles.middle}>{userInfoDetail?.likeCount}</p>
      </div>
      <div className={styles.rating}>
        <p className={styles.top}>⭐ 평균 평점 ⭐</p>
        {!!userInfoDetail?.averageScore ? (
          <p className={styles.middle}>
            {userInfoDetail?.averageScore.toFixed(1)}
          </p>
        ) : (
          <p className={styles.middle}>0</p>
        )}
      </div>
      <div className={styles.review}>
        <p className={styles.top}>✍ 내가 남긴 리뷰 수 ✍</p>
        <p className={styles.middle}>{userInfoDetail?.reviewCount}</p>
      </div>
    </section>
  );
};
export default InfoDetail;
