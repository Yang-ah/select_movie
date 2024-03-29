import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../../state';
import { createReview } from '../../../api/Reviews';
import { HeaderLeft } from '../_shared';
import styles from './reviewInput.module.scss';
import Button from '../../Common/Button';
import Stars from '../../Common/Stars';

const ReviewInput = ({ id, fetchReviews, userName, date, ...props }) => {
  const isLogin = useRecoilValue(isLoginAtom);

  const [newReview, setNewReview] = useState({
    content: '',
    score: 0,
  });

  const onClick = async () => {
    if (!isLogin) {
      return alert('로그인 후 리뷰 등록 가능합니다.');
    }

    if (!newReview.score) {
      return alert('별점을 선택해주세요.');
    }
    if (newReview.content.length < 10) {
      return alert('리뷰를 10자 이상 입력해주세요.');
    }

    await createReview(id, newReview);
    await fetchReviews();
    setNewReview({
      content: '',
      score: 0,
    });
  };

  const onChange = (e) => {
    setNewReview({
      ...newReview,
      content: e.currentTarget.value,
    });
  };

  useEffect(() => {
    setNewReview({
      content: '',
      score: 0,
    });
  }, [id]);

  return (
    <section className={styles.wrap}>
      <header>
        <HeaderLeft type="reviewInput" userName={userName} date={date} />
        <Stars
          className={styles.stars}
          onChange={setNewReview}
          value={newReview.score}
          movieId={id}
        />
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
        <Button onClick={onClick} children="리뷰 등록" option="secondary" />
      </main>
    </section>
  );
};

export default ReviewInput;
