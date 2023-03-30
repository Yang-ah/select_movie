import React from "react";
import styles from "./info.module.scss";

import Stars from "../../../components/Common/Stars";
import { SettingIcon } from "../../../assets/icon";

const Info = () => {
  return (
    <section className={styles.wrapper}>
      <first className={styles.first}>
        <div className={styles.img}>🤔</div>
        <div className={styles.info}>
          <div className={styles.left}>
            <p className={styles.userName}>닉네임</p>
            <p className={styles.introduce}>
              소개글글글~~
              ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
              ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
              ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
            </p>
          </div>
          <a href="/" className={styles.setting}>
            <SettingIcon />
          </a>
        </div>
      </first>
      <second className={styles.second}>
        <div className={styles.rating}>
          <p className={styles.top}>평균 평점</p>
          <p className={styles.num}>
            <Stars />
          </p>
          <p className={styles.comment}>총 num 개의 라뷰를 남겼어요!</p>
        </div>
        <div className={styles.isliked}>
          <p className={styles.top}>좋아요 표시한 영화 수</p>
          <p className={styles.num}>num</p>
          <p className={styles.comment}>음~ 거의 전문가!</p>
        </div>
        <div className={styles.review}>
          <p className={styles.top}>내가 남긴 리뷰 수</p>
          <p className={styles.num}>num</p>
          <p className={styles.comment}>음~ 거의 전문가!</p>
        </div>
      </second>
    </section>
  );
};
export default Info;
