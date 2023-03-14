import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./header.module.scss";

const Header = () => {
  //MEMO: 경로를 이동할 때 사용
  const navigate = useNavigate();

  const onClick = (path) => {
    return () => {
      navigate(path);
    };
  };
  return (
    <section className={styles.headerBody} >
        <div>무비셀렉터</div>
        <div>북마크</div>
        <div>이미봄</div>
        <div>검색</div>
        <div>로그인</div>
        <div>회원가입</div>
    </section>
  );
};

export default Header;
