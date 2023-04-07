import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './infoBox.module.scss';
import useMe from '../../../hooks/useMe';
import { isLoginAtom } from '../../../atom';
import { useRecoilValue } from 'recoil';

import Stars from '../../../components/Common/Stars';
import { SettingIcon } from '../../../assets/icon';
import InfoModal from '../InfoModal';
import { getUsersMeInfo } from '../../../api/Users';

const Info = () => {
  const me = useMe();
  const isLogin = useRecoilValue(isLoginAtom);

  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();

  const fetchUserInfo = async () => {
    const response = await getUsersMeInfo();
    setUserInfo(response.data);
    //    console.log(response.data);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    fetchUserInfo();
  }, [id]);

  return (
    <section className={styles.wrapper}>
      <article className={styles.info}>
        <div className={styles.img}>😊</div>
        <div className={styles.text}>
          <div className={styles.infoTop}>
            {/*} {!isLogin && <p className={styles.userName}>누군가의 name</p>}
            {isLogin && (*/}
            <div>
              <p className={styles.userName}>이름 : {me && me.name}</p>
              <p className={styles.userName}>닉네임 : {me && me.nickName}</p>
              <p className={styles.userName}>이메일 : {me && me.email}</p>
            </div>
            {/*} )} */}
            {isLogin && (
              <button
                className={styles.setting}
                type="submit"
                value="modify"
                onClick={showModal}
              >
                <SettingIcon />
              </button>
            )}
            <InfoModal
              className={styles.inputModal}
              modalOpen1={modalOpen}
              setModalOpen={setModalOpen}
              notion="소개글 수정"
              buttonChildren="완료"
            />
          </div>
          <div className={styles.introduce}>{me && isLogin && me.email}</div>
        </div>
      </article>
      <article className={styles.category}>
        <div className={styles.isliked}>
          <p className={styles.top}>💛 좋아요 표시한 영화 수 💛</p>
          <p className={styles.middle}>{userInfo?.likeCount}</p>
        </div>
        <div className={styles.rating}>
          <p className={styles.top}>⭐ 평균 평점 ⭐</p>
          <p className={styles.middle}>{userInfo?.averageScore.toFixed(1)}</p>
        </div>
        <div className={styles.review}>
          <p className={styles.top}>✍ 내가 남긴 리뷰 수 ✍</p>
          <p className={styles.middle}>{userInfo?.reviewCount}</p>
        </div>
      </article>
    </section>
  );
};
export default Info;
