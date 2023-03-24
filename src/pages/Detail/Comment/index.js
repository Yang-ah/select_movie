import styles from "./comment.module.scss";
import cx from "classnames";
import { ShareIcon, SolidStarIcon } from "../../../assets/icon";

const Comment = ({ comment, userName, date, option, rating }) => {
  return (
    <article className={cx(styles.wrap, styles[option])}>
      <header>
        <div className={styles.left}>
          {option === "child" && <ShareIcon className={styles.IShare} />}
          <p className={styles.profileIcon}>🤔</p>
          <div>
            <h2 className={styles.userName}>{userName}</h2>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
        <div className={styles.right}>
          {option === "comment" && (
            <p className={styles.rating}>
              <SolidStarIcon />
              {rating}
            </p>
          )}
          <p>up and down</p>
        </div>
      </header>
      <main>{comment}</main>
    </article>
  );
};

export default Comment;
