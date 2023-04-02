import Button from "../Common/Button";
import styles from "./ReviewInput.module.scss";
import { HeaderLeft } from "./_shared";
import Stars from "../Common/Stars";
import cx from "classnames";

export const ReviewInput = ({ onChange, onClick, userName, date }) => {
  return (
    <section className={styles.wrap}>
      <header>
        <HeaderLeft type="reviewInput" userName={userName} date={date} />
        <Stars className={styles.stars} onChange={onChange} />
      </header>

      <main>
        <textarea className={styles.input} onChange={onChange} name="content" />
        <Button onClick={onClick} children="리뷰 등록" type="comment" />
      </main>
    </section>
  );
};
