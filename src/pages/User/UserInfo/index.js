import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './info.module.scss';

import { UserIcon } from '../../../assets/icon';
import { getUserDetail } from '../../../api/Users';

const Info = () => {
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
    <section className={styles.info}>
      <div className={styles.profile}>
        {' '}
        <UserIcon className={styles.userIcon} />
      </div>
      <div className={styles.text}>
        <li className={styles.left}>
          <a className={styles.name}>
            {userData?.nickname} ( {userData?.name} )
          </a>
          님에 대해 알아보세요
        </li>
        <li className={styles.description}>{userData?.description}</li>
      </div>
    </section>
  );
};
export default Info;
