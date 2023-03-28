import React from "react";
import styles from "./mypage.module.scss";

import Info from "./InfoBox";
import { MyCarousel } from "../../components/Carousel";
import Comment from "./CommentBox";


const MyPage = () => {
  return (
    <section className={styles.wrap}>
      <logo>마이페이지</logo>
      <header>
        <Info />
      </header>
      <main>
        <div className={styles.contentbox}>
          <p>내가 좋아하는 컨텐츠</p>
          <MyCarousel />
        </div>
        <div className={styles.commentbox}>
          <p>작성한 리뷰 및 댓글</p>
          <Comment />
        </div>
      </main>
    </section>
  );
};

export default MyPage;
