import { useEffect, useState } from 'react';
import { getUsersMe } from '../api/Users';

const useMe = () => {
  const [me, setMe] = useState(null);

  const onGetMe = async () => {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
      return;
    }

    const response = await getUsersMe();
    if (response.data) {
      setMe(response.data);
    }
  };

  useEffect(() => {
    onGetMe();
  }, []);

  return { me, onGetMe };
};

export default useMe;
