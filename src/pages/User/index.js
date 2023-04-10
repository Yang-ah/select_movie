import { useParams } from 'react-router-dom';
import { getUserDetail } from '../../api/Users';
import styles from './user.module.scss';
import { useEffect, useState } from 'react';

const User = () => {
  const userId = useParams();
  const [userData, setUserData] = useState();

  const fetchUserDetail = async () => {
    const response = await getUserDetail(userId.id);
    console.log('유저페이지 유저디테일:', response.data);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return <section className={styles.wrap}>UserPage</section>;
};

export default User;
