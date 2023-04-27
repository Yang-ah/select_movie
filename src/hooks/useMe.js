import { useEffect, useState } from 'react';
import { getUsersMe } from '../api/Users';

const useMe = () => {

  const [me, setMe] = useState(null);

  const onGetMe = async () => {
    const me = await getUsersMe();
    if (me.data) {
      setMe(me.data);
    }
  };

  useEffect(() => {
    onGetMe();
  }, []);

  return { me, onGetMe };
};

export default useMe;
