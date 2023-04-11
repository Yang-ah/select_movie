import { useEffect, useState } from 'react';
import { getUsersMe } from '../api/Users';
//NOTE: 커스텀 훅

//NOTE: return에 setMe를 같이 내보내기
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

  return me;
};

export default useMe;
