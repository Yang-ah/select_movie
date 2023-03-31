import styles from "./comment.module.scss";
import cx from "classnames";
import Button from "../Common/Button";

import { HeaderLeft, HeaderRight } from "./_shared";

// type : commentInput(디테일 리뷰 입력), comment(리뷰), child(댓글), preview(미리보기)
const Comment = ({
  comment,
  userName,
  date,
  type,
  rating,
  up = 0,
  down = 0,
  className,
}) => {
  const isCommentInput = type === "commentInput";

  return (
    <section className={cx(styles.wrap, styles[type], className)}>
      <header>
        <HeaderLeft type={type} userName={userName} date={date} />
        <HeaderRight type={type} rating={rating} up={up} down={down} />
      </header>

      <main>
        {isCommentInput && (
          <>
            <textarea className={styles.inputWrap} />
            <Button option="comment" children="코멘트등록" />
          </>
        )}
        {isCommentInput || comment}
      </main>
    </section>
  );
};

export default Comment;