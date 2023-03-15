import React from "react";
import styles from "./header.module.scss";


const Header = () => {
  //MEMO: 경로를 이동할 때 사용



  return (
    <section className={styles.headerBody} >
        <div className={styles.headerLogo}>무비셀렉터</div>
        <div>검색</div>
        <div className={styles.headerLogin}>
        <p className={styles.headerSign}>로그인</p>
        <p className={styles.headerSign}>회원가입</p>
        </div>
    </section>
  );
};

export default Header;
