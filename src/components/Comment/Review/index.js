import { useEffect, useState } from 'react';
import { HeaderLeft, HeaderRightRating, HeaderRightButtons } from '../_shared';
import { deleteReview, getMyReview, patchReview } from '../../../api/Reviews';
import { ModifyIcon, TrashIcon } from '../../../assets/icon';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../../state';
import Button from '../../Common/Button';
import useMe from '../../../hooks/useMe';
import Modal from '../../Common/Modal';
import Stars from '../../Common/Stars';
import styles from './review.module.scss';
import cx from 'classnames';

const Review = ({
  comment,
  userName,
  date,
  rating,
  reviewId,
  written,
  fetchReviews,
  movieId,
}) => {
  const { me } = useMe();
  const isLogin = useRecoilValue(isLoginAtom);
  const [isUserMe, setIsUserMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [canModify, setCanModify] = useState(false);
  const [modifiedReview, setModifiedReview] = useState({
    content: comment,
    score: rating,
  });
  const onClickModify = () => setCanModify(true);
  const onClickDelete = () => setModalOpen(true);

  const isMyReview = async () => {
    const response = await getMyReview(movieId);
    response.data && setIsUserMe(response.data.user.id === written);
  };

  const onClickDeleteReview = async () => {
    await deleteReview(reviewId);
    await fetchReviews();
    setModalOpen(false);
  };

  const onChangeModifiedReview = (e) => {
    const { value } = e.currentTarget;
    setModifiedReview((prev) => {
      return { ...prev, ['content']: value };
    });
  };

  const onPatchReview = async () => {
    await patchReview(reviewId, modifiedReview);
    await fetchReviews();
    setCanModify(false);
  };

  useEffect(() => {
    isMyReview();
  }, [isLogin, me]);

  return (
    <section className={cx(styles.wrap, { [styles.myReview]: isUserMe })}>
      <header>
        <HeaderLeft
          type="review"
          userName={userName}
          date={date}
          writtenId={written}
        />
        <article className={styles.right}>
          <HeaderRightRating rating={rating} />
          <HeaderRightButtons reviewId={reviewId} />

          {isUserMe && (
            <div className={styles.myButtons}>
              <button type="button" name="modify" onClick={onClickModify}>
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

      {canModify || <main>{comment}</main>}

      {canModify && (
        <main className={styles.modifyMain}>
          <Stars
            className={styles.star}
            value={modifiedReview.score * 2}
            onChange={setModifiedReview}
          />
          <div className={styles.inputWrap}>
            <textarea
              value={modifiedReview.content}
              onChange={onChangeModifiedReview}
            />
            <Button option="secondary" onClick={onPatchReview}>
              수정
            </Button>
          </div>
        </main>
      )}
    </section>
  );
};

export default Review;
