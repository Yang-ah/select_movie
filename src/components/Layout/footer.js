import React from "react";
import styles from "./footer.module.scss";


const Footer = () => {
  return (
    <section className={styles.footerBody} >
        <h1>무비셀렉터</h1>
        <p>1조팀</p>
        <p>조원 : 이인국, 주양아, 신현중, 구성미</p>
        <br></br>
        <p>code state @2023 coperation</p>
        <a href="https://github.com/Yang-ah/select_movie.git">
            https://github.com/Yang-ah/select_movie.git</a>
    </section>
  );
};

export default Footer;