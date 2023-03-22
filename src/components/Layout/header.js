import React from "react";
import styles from "./header.module.scss";

import { Link } from "react-router-dom";

// 인라인 스타일링 지양! 유지보수 어렵.
const Header = () => {
  return (
    <section className={styles.headerBody}>
      <Link to="/" className={styles.Link}>
        <div className={styles.headerLogo}>무비셀렉터</div>
      </Link>
      {/* <input type="text"  /> */}
      <div>검색</div>
      <div className={styles.headerLogin}>
        <Link to="/auth/login" className={styles.Link}>
          <p className={styles.headerSign}>로그인</p>
        </Link>
      </div>
    </section>
  );
};

export default Header;
