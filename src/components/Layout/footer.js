import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <section className={styles.footerBody}>
      <div className={styles.footerName}>
        <h1>무비셀렉터</h1>
        <h2>1팀 : 이인국, 주양아, 신현중, 구성미</h2>
      </div>
      <div className={styles.footerInfo}>
        <p>code state @2023 coperation</p>
        <a href="https://github.com/Yang-ah/select_movie.git">
          https://github.com/Yang-ah/select_movie.git
        </a>
      </div>
    </section>
  );
};

export default Footer;
