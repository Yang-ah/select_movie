import React from "react";
import styles from "./header.module.scss";

import { Link } from "react-router-dom";
import { Button } from "../Common";

// 인라인 스타일링 지양! 유지보수 어렵.
const Header = () => {
  return (
    <header className={styles.wrap}>
      <Link to="/">
        <div className={styles.logo}>무비셀렉터</div>
      </Link>

      <div className={styles.right}>
        {<p className={styles.todo}>TODO : searchInput</p>}

        <Link to="/auth/login">
          <Button children={"로그아웃"} className={styles.headerSign} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
