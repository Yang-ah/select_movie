import styles from "./preview.module.scss";
import cx from "classnames";
import { HeaderLeft, HeaderRightRating } from "../_shared";

const Preview = ({ comment, userName, date, rating, className, ...props }) => {
  return (
    <section className={cx(styles.wrap, className)}>
      <header>
        <HeaderLeft type="preview" userName={userName} date={date} />
        <HeaderRightRating rating={rating} />
      </header>

      <main>{comment}</main>
    </section>
  );
};

export default Preview;
