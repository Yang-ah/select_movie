import React from "react";
import styles from "./detail.module.scss";
import dummy from "../../mock_comment.json";
import Accordion from "./Accordion";
import Comment from "../../components/Comment";

const Detail = () => {
  return (
    <section>
      <header className={styles.header}>
        <h1 className={styles.poster}>1.POSTER</h1>
        <h1 className={styles.movieinfo}>2 MOVIE_INFO</h1>
        <p>제목</p>
        <p>장르</p>
        <p>출판/배급사</p>
        <p>출연진</p>
        <p>줄거리</p>
        <p>별점</p>
      </header>
      <main className={styles.main}>
        <h2 className={styles.comment}>Comment</h2>
        <Accordion />
      </main>
      <section className={styles.wrapper}>
        <h2>type=preview</h2>
        <Comment
          type="preview"
          key={dummy[0].userName + "2"}
          userName={dummy[0].userName}
          comment={dummy[0].comment}
          // date={dummy[0].date} TODO : 넣을지 상의
          rating={dummy[0].rating}
        />

        <h2>type=commentInput</h2>
        <Comment
          type="commentInput"
          key={dummy[0].userName + "2"}
          userName={dummy[0].userName}
        />

        <h2>type=comment</h2>

        <Comment
          type="comment"
          key={dummy[0].userName + "2"}
          userName={dummy[0].userName}
          comment={dummy[0].comment}
          date={dummy[0].date}
          rating={dummy[0].rating}
          up={dummy[0].up}
          down={dummy[0].down}
        />

        <h2>type=child</h2>
        <Comment
          type="child"
          key={dummy[0].userName + "2"}
          userName={dummy[0].userName}
          comment={dummy[0].comment}
          date={dummy[0].date}
          rating={dummy[0].rating}
          up={dummy[0].up}
          down={dummy[0].down}
        />

        <h2>used map (comment & child)</h2>

        {dummy.map((commentObj) => {
          return (
            <>
              <Comment
                type="comment"
                key={commentObj.userName + "2"}
                userName={commentObj.userName}
                comment={commentObj.comment}
                date={commentObj.date}
                rating={commentObj.rating}
                up={commentObj.up}
                down={commentObj.down}
              />

              {commentObj.children.map((child) => {
                return (
                  <Comment
                    key={child.userName + "1"}
                    type="child"
                    comment={child.comment}
                    userName={child.userName}
                    date={child.date}
                    up={commentObj.up}
                    down={commentObj.down}
                  />
                );
              })}
            </>
          );
        })}
      </section>
    </section>
  );
};

export default Detail;
