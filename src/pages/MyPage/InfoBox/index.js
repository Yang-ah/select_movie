import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './infoBox.module.scss';
import useMe from '../../../hooks/useMe';

import { getUsersMeInfo } from '../../../api/Users';
import InfoModal from '../Modal/infoModal';
import { UserIcon, SettingIcon } from '../../../assets/icon';

const Info = () => {
  const me = useMe();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [usersData, setUsersData] = useState();
  const [SelectedIDs, setSelectedIDs] = useState([]);
  const [SelectIndex, setSelectIndex] = useState();

  const fetchUserInfo = async () => {
    const response = await getUsersMeInfo();
    setUserInfo(response.data);
  };

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState();

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setForm(value);
  };
  const showModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedIDs([]);
    setModalOpen(false);
    setModalOpen2(false);
    responseData();
  };

  useEffect(() => {
    fetchUserInfo();
  }, [id]);

  return (
    <section className={styles.wrapper}>
      <article className={styles.info}>
        <div className={styles.profile}>
          {/* <UserIcon className={styles.nickname} /> */}
          {/*<p className={styles.nickname}>{me && me.nickname}</p>*/}
          <p className={styles.nickname}>😭</p>
        </div>
        <div className={styles.text}>
          <div className={styles.left}>
            <li className={styles.nickname}>{me && me.name}</li>
            <li className={styles.description}>{me && me.description}</li>
          </div>

          <button
            className={styles.setting}
            type="submit"
            value="modify"
            onClick={showModal}
          >
            <SettingIcon />
          </button>
          <InfoModal
            className={styles.inputModal}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            closeModal={closeModal}
            notion="소개글 수정"
            buttonChildren="완료"
            ID={SelectedIDs[0]}
            setMovieData={setUsersData}
            selectedData={usersData}
            setSelectedIDs={setSelectedIDs}
          />
        </div>
      </article>
      <article className={styles.category}>
        <div className={styles.isliked}>
          <p className={styles.top}>💛 좋아요 표시한 영화 수 💛</p>
          <p className={styles.middle}>{userInfo?.likeCount}</p>
        </div>
        <div className={styles.rating}>
          <p className={styles.top}>⭐ 평균 평점 ⭐</p>
          {!!userInfo?.averageScore ? (
            <p className={styles.middle}>{userInfo?.averageScore.toFixed(1)}</p>
          ) : (
            <p className={styles.middle}>0</p>
          )}
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
