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
    console.log('인포:', response.data);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <section className={styles.info}>
      <div className={styles.profile}>
        {/* <UserIcon className={styles.icon} /> */}
      </div>
      <div className={styles.top}>
        <li className={styles.text}>
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
