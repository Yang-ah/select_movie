import React, { useState, useEffect } from "react";


import styles from "./header.module.scss"
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  //MEMO: 경로를 이동할 때 사용
  const navigate = useNavigate();

  const onClick = (path) => {
    return () => {
      navigate(path);
    };
  };
  return (
  <header className={styles.header}>
          <p className={styles.title}>무비셀렉트</p>
          <p className={styles.subTitle}>북마크</p>
          <p className={styles.subTitle}>이미봤음</p>
          <div className={styles.inputContainer}>
              <input type="text"  />
              <button type="button" >검색</button>
              <Link to='/auth/login'><button type="button" className={styles.loginButton}>
                  로그인</button></Link>
              <Link to='/auth/register'><button type="button" className={styles.loginButton}>
              회원가입</button></Link>
          </div>
  </header>
  );
};

export default Header;
