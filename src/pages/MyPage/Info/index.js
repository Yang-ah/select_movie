import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './info.module.scss';
import useMe from '../../../hooks/useMe';

import { getUsersMeInfo } from '../../../api/Users';
import InfoModal from './infoModal';
import { UserIcon, SettingIcon } from '../../../assets/icon';

const Info = () => {
  const { me, onGetMe } = useMe();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();

  const fetchUserInfo = async () => {
    const response = await getUsersMeInfo();
    setUserInfo(response.data);
  };

  //모달
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    fetchUserInfo();
    onGetMe(); //NOTE: 수정되는 정보를 가져오는 api를 호출해야합니다~
  };

  const showModal = () => {
    setModalOpen(true);
  };
  console.log('info', { modalOpen, userInfo });

  useEffect(() => {
    fetchUserInfo();
  }, [id, modalOpen]);

  return (
    <section className={styles.info}>
      <div className={styles.profile}>🙂</div>
      <div className={styles.text}>
        <div className={styles.left}>
          <li className={styles.name}>{me && me.name}</li>
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
          callback={fetchUserInfo}
        />
      </div>
    </section>
  );
};
export default Info;
