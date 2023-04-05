import styles from './review.module.scss';
import cx from 'classnames';
import { HeaderLeft, HeaderRightRating, HeaderRightButtons } from '../_shared';
import { useEffect, useState } from 'react';
import useMe from '../../../hooks/useMe';
import { isLoginAtom } from '../../../atom';
import { useRecoilValue } from 'recoil';
import { ModifyIcon, TrashIcon } from '../../../assets/icon';
import Modal from '../../Common/Modal';
import { deleteReview, getMyReview } from '../../../api/Reviews';

const Review = ({
  comment,
  userName,
  date,
  rating,
  reviewId,
  written,
  className,
  fetchReviews,
  movieId,
}) => {
  const me = useMe();

  const isLogin = useRecoilValue(isLoginAtom);
  const [isUserMe, setIsUserMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isMyReview = async () => {
    const response = await getMyReview(movieId);
    response.data && setIsUserMe(response.data.user.id === written);
  };

  useEffect(() => {
    isMyReview();
  }, [isLogin, me]);

  const onClickDelete = () => {
    setModalOpen(true);
  };

  const onClickDeleteReview = async () => {
    await deleteReview(reviewId);
    await fetchReviews();
    setModalOpen(false);
  };

  return (
    <section className={cx(styles.wrap, { [styles.myReview]: isUserMe })}>
      <header>
        <HeaderLeft type="review" userName={userName} date={date} />
        <article className={styles.right}>
          <HeaderRightRating rating={rating} />
          <HeaderRightButtons type="review" reviewId={reviewId} />
          {isUserMe || (
            <button type="button" name="report">
              신고하기
            </button>
          )}
          {isUserMe && (
            <div className={styles.myButtons}>
              <button type="button" name="modify">
                <ModifyIcon />
              </button>
              <button type="button" name="delete" onClick={onClickDelete}>
                <TrashIcon />
              </button>
              <Modal
                className={styles.modal}
                modalOpen1={modalOpen}
                setModalOpen={setModalOpen}
                buttonChildren="삭제"
                onClick={onClickDeleteReview}
              >
                리뷰를 삭제하시겠습니까?
              </Modal>
            </div>
          )}
        </article>
      </header>

      <main>{comment}</main>
    </section>
  );
};

export default Review;
