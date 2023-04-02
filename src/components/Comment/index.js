import styles from "./comment.module.scss";
import cx from "classnames";
import Button from "../Common/Button";

import { HeaderLeft, HeaderRight } from "./_shared";

// type : reviewInput(리뷰 입력), review(리뷰), comment(댓글), preview(미리보기)
const Comment = ({
  comment,
  userName,
  date,
  type,
  rating,
  up = 0,
  down = 0,
  className,
  onClick,onChange,
  ...props
}) => {
  const isReviewInput = type === "reviewInput";

  return (
    <section className={cx(styles.wrap, styles[type], className)}>
      <header>
        <HeaderLeft type={type} userName={userName} date={date} />
        <HeaderRight
          type={type}
          rating={rating}
          up={up}
          down={down}
          onChange={onChange}
        />
      </header>

      <main>
        {isReviewInput && (
          <>
            <textarea className={styles.inputWrap} name="content" {...props} />
            <Button onClick={onClick} option="comment" children="리뷰 등록" />
          </>
        )}
        {isReviewInput || comment}
      </main>
    </section>
  );
};

export default Comment;
