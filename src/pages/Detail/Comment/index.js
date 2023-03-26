import styles from "./comment.module.scss";
import cx from "classnames";
import {
  ShareIcon,
  SolidStarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "../../../assets/icon";

const Comment = ({
  comment,
  userName,
  date,
  option,
  rating,
  up = 0,
  down = 0,
}) => {
  return (
    <article className={cx(styles.wrap, styles[option])}>
      <header>
        <div className={styles.left}>
          {option === "child" && <ShareIcon className={styles.IShare} />}
          <p className={styles.profileIcon}>🤔</p>

          <div className={styles.profileText}>
            <h2 className={styles.userName}>{userName}</h2>
            <p className={styles.date}>{date}</p>
          </div>
        </div>

        <div className={styles.right}>
          {option === "child" || (
            <p className={styles.rating}>
              <SolidStarIcon />
              {rating}
            </p>
          )}
          {option === "preview" || (
            <>
              <span className={styles.upDown}>
                <button name="up">
                  <ThumbsUpIcon />
                  {up + ""}
                </button>
                <button name="down">
                  <ThumbsDownIcon />
                  {down + ""}
                </button>
              </span>
              <button type="button" name="report">
                신고하기
              </button>
            </>
          )}
        </div>
      </header>
      <main className={styles.comment}>{comment}</main>
    </article>
  );
};

export default Comment;
