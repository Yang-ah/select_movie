import styles from "./comment.module.scss";
import cx from "classnames";
import {
  ShareIcon,
  SolidStarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "../../assets/icon";
import Button from "../Common/Button";

import Stars from "../Common/Stars";

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
  return (
    <article className={cx(styles.wrap, styles[type], className)}>
      <header>
        <div className={styles.left}>
          {type === "child" && <ShareIcon className={styles.IShare} />}
          <p className={styles.profileIcon}>🤔</p>

          <div className={styles.profileText}>
            <h2 className={styles.userName}>{userName}</h2>
            <p className={styles.date}>{date}</p>
          </div>
        </div>

        <div
          className={cx(
            styles.right,
            type === "commentInput" && styles.starsWrap
          )}
        >
          {type === "commentInput" ? (
            <Stars className={styles.stars} />
          ) : (
            <>
              {type === "child" || (
                <p className={styles.rating}>
                  <SolidStarIcon />
                  {rating}
                </p>
              )}
              {type === "preview" || (
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
            </>
          )}
        </div>
      </header>
      <main className={styles.comment}>
        {type === "commentInput" ? (
          <>
            <textarea className={styles.inputWrap} />
            <Button option="comment" children="코멘트등록" />
          </>
        ) : (
          comment
        )}
      </main>
    </article>
  );
};

export default Comment;
