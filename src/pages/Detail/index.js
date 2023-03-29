import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";
import FakeAccordion from "./Accordion/FakeAccordian";
import DetailInfo from "./DetailInfo";
import Dropdown from "../../components/Common/Dropdown";
import Comment from "../../components/Comment";

const Detail = ({ id }) => {
  // TODO: DetailHeader {id}로 변경하기 !
  // TODO: CommentInput "닉네임", 등록 api 연결하기 !
  // TODO: Dropdown 정렬 글씨 줄이기, 애니메이션 추가(화살표 돌아가게), border?
  // TODO : 리뷰 api 받아서, 리뷰에 댓글이 있다면 Accordion, 없다면 comment 받기
  // TODO : 정렬(별점순, 댓글 많은 순)

  return (
    <>
      <DetailInfo id="0151449f-d2ae-4753-a44c-79be9044f8ff" />
      <div className={styles.sectionWrap}>
        <section className={styles.commentsSection}>
          <Comment
            type="commentInput"
            className={styles.commentInput}
            userName="닉네임"
          />
          <header>
            <h1>Comments</h1>
            <Dropdown items={["별점순", "댓글많은순"]} />
          </header>
          <main>
            <FakeAccordion />
            <Comment
              type="comment"
              comment="라라라랄ㄹ라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라ㅏㅏ"
              userName="라라랄"
              rating="4.5"
            />
            <Comment
              type="comment"
              comment="라라라랄ㄹ라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라ㅏㅏ"
              userName="라라랄"
              rating="4.5"
            />
            <Comment
              type="comment"
              comment="라라라랄ㄹ라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라ㅏㅏ"
              userName="라라랄"
              rating="4.5"
            />
            <FakeAccordion />
            <Comment
              type="comment"
              comment="라라라랄ㄹ라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라ㅏㅏ"
              userName="라라랄"
              rating="4.5"
            />
            <FakeAccordion />
          </main>
        </section>
      </div>
    </>
  );
};

export default Detail;
