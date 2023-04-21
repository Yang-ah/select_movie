import React, { useEffect, useState } from 'react';
import { getUsersMeInfo } from '../../../api/Users';
import { UserIcon, SettingIcon } from '../../../assets/icon';
import styles from './info.module.scss';
import useMe from '../../../hooks/useMe';
import InfoModal from './InfoModal';

const Info = () => {
  const { me, onGetMe } = useMe();
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => setModalOpen(true);
  const fetchUserInfo = async () => await getUsersMeInfo();

  //모달
  const closeModal = () => {
    setModalOpen(false);
    fetchUserInfo();
    onGetMe();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <section className={styles.info}>
      <div className={styles.profile}>
        <UserIcon className={styles.userIcon} />
      </div>
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
