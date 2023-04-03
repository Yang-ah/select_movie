import { useState } from "react";
import Button from "../../Common/Button";
import Stars from "../../Common/Stars";
import { HeaderLeft } from "../_shared";
import styles from "./reviewInput.module.scss";
import { createReview } from "../../../api/Reviews";

const ReviewInput = ({ id, fetchReviews, userName, date, ...props }) => {
  const [newReview, setNewReview] = useState({
    content: "",
    score: 0,
  });

  const onClick = () => {
    if (!newReview.score) {
      return alert("별점을 선택해주세요.");
    }
    if (newReview.content.length < 10) {
      return alert("리뷰를 10자 이상 입력해주세요.");
    }
    createReview(id, newReview);
    fetchReviews();
    setNewReview({
      content: "",
      score: 0,
    });
  };

  const onChange = (e) => {
    setNewReview({
      ...newReview,
      content: e.currentTarget.value,
    });
  };

  return (
    <section className={styles.wrap}>
      <header>
        <HeaderLeft type="reviewInput" userName={userName} date={date} />
        <Stars className={styles.stars} onChange={setNewReview} />
      </header>

      <main>
        <textarea
          className={styles.input}
          onChange={onChange}
          {...props}
          name="content"
          required
          minLength="10"
          value={newReview.content}
        />
        <Button onClick={onClick} children="리뷰 등록" option="comment" />
      </main>
    </section>
  );
};

export default ReviewInput;
