import React from "react";
import styles from "./header.module.scss";

import { Link } from "react-router-dom";
import { Button, SearchInput } from "../Common";

//recoil
import { useRecoilState } from 'recoil';
import { isLoginAtom } from "../../atom";

// 인라인 스타일링 지양! 유지보수 어렵.
const Header = () => {
//recoil
const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

const logout =()=>{
  setIsLogin(false)
  alert('로그아웃 되었습니다')
};
  return (
    <header className={styles.wrap}>
      <Link to="/">
        <div className={styles.logo}>무비셀렉터</div>
      </Link>

      <div className={styles.right}>
        <SearchInput option="iconLocation" className={styles.searchInput} />
        {!isLogin &&
        <Link to="/auth/login">
          <Button children={"로그인"} className={styles.headerSign} />
        </Link>
        }
        {isLogin &&
        <>
        <Link to="/my">
          <Button children={"마이페이지"} className={styles.headerSign} />
        </Link>
        <Button children={"로그아웃"} className={styles.headerSign} 
          onClick={logout}
          />
        </>
        }
      </div>
    </header>
  );
};

export default Header;
