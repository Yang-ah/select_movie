import styles from "./comment.module.scss";
import cx from "classnames";
import { HeaderLeft, HeaderRight } from "./_shared";

// type : review(리뷰), comment(댓글), preview(미리보기)
const Comment = ({
  comment,
  userName,
  date,
  type,
  rating,
  up = 0,
  down = 0,
  className,
  ...props
}) => {
  return (
    <section className={cx(styles.wrap, styles[type], className)}>
      <header>
        <HeaderLeft type={type} userName={userName} date={date} />
        <HeaderRight type={type} rating={rating} up={up} down={down} />
      </header>

      <main>{comment}</main>
    </section>
  );
};

export default Comment;
