import React from "react";
import styles from "./header.module.scss";

import {Link } from "react-router-dom";

const Header = () => {
  return (
    <section className={styles.headerBody} >
        <Link to='/' style={{ textDecoration: "none" }}><div className={styles.headerLogo}>무비셀렉터</div></Link>
        {/* <input type="text"  /> */}
        <div>검색</div>
        <div className={styles.headerLogin}>
        <Link to='/auth/login' style={{ textDecoration: "none" }}><p className={styles.headerSign}>로그인</p></Link>
        <Link to='/auth/register' style={{ textDecoration: "none" }}><p className={styles.headerSign}>회원가입</p></Link>
        </div>
    </section>
  );
};

export default Header;
