import HeaderRightButtons from "../HeaderRightButtons";
import { HeaderRightRating } from "../HeaderRightRating";
import Stars from "../../../Common/Stars";
import styles from "./headerRight.module.scss";
import cx from "classnames";

const HeaderRight = ({ type, rating, up, down, className }) => {
  return (
    <article className={cx(styles.right, className)}>
      {type === "commentInput" && <Stars className={styles.stars} />}
      {type === "comment" && (
        <>
          <HeaderRightRating rating={rating} />
          <HeaderRightButtons up={up} down={down} type={type} />
        </>
      )}
      {type === "child" && (
        <HeaderRightButtons up={up} down={down} type={type} />
      )}
      {type === "preview" && <HeaderRightRating rating={rating} />}
    </article>
  );
};

export default HeaderRight;
