import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './reviewCard.module.scss';
import {
  SolidStarIcon,
  ModifyIcon,
  TrashIcon,
  DoubleChevronRightIcon,
} from '../../../assets/icon';
import useMe from '../../../hooks/useMe';
import { isLoginAtom } from '../../../state';
import { useRecoilValue } from 'recoil';
import { deleteReview, getMyReview, patchReview } from '../../../api/Reviews';
import Stars from '../../../components/Common/Stars';
import { ReviewModal } from './ReviewModal';

const Review = ({
  title,
  createdAt,
  movieId,
  reviewId,
  content,
  score,
  fetchMyReviews,
}) => {
  const navigate = useNavigate();
  const onClickComment = () => {
    navigate(`/detail/${movieId}`);
  };

  const [postForm, setPostForm] = useState({
    content: '',
    score: '',
  });

  const { me, onGetMe } = useMe();
  const isLogin = useRecoilValue(isLoginAtom);
  const [isUserMe, setIsUserMe] = useState(false);
  const [canModify, setCanModify] = useState(false);
  const [modifiedReview, setModifiedReview] = useState({
    content: me?.content,
    score: me?.score,
  });
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  useEffect(() => {
    isMyReview();
    onGetMe();
  }, [isLogin, me]);

  const isMyReview = async () => {
    //NOTE: getReviewsMe => getMyReview 로 수정
    const response = await getMyReview(movieId);
    response.data && setIsUserMe(response.data.user.id === written);
  };

  const onClickDelete = () => {
    setDeleteModalOpen(true);
  };
  const onClickDeleteReview = async () => {
    await deleteReview(reviewId);
    await fetchMyReviews();
    setDeleteModalOpen(false);
    return alert(`[ ` + title + ` ] 이/가 삭제되었습니다!`);
  };

  const onClickModify = () => {
    setModifyModalOpen(true);
  };

  const onChangeModifiedReview = (e) => {
    const { value } = e.currentTarget;
    setModifiedReview((prev) => {
      return { ...prev, ['content']: value };
    });
  };

  const onPatchReview = async () => {
    await patchReview(reviewId, modifiedReview);
    await fetchMyReviews();
    setCanModify(false);
    setModifyModalOpen(false);
  };

  useEffect(() => {
    setPostForm({
      content: me?.content,
      score: me?.score,
    });
  }, []);

  return (
    <section className={styles.screen}>
      <article className={styles.layerUp}>
        <div className={styles.upper}>
          <button
            className={styles.fixModal}
            type="button"
            name="modify"
            onClick={onClickModify}
          >
            <ModifyIcon className={styles.icon} />
          </button>
          <button
            className={styles.deleteModal}
            type="button"
            name="delete"
            onClick={onClickDelete}
          >
            <TrashIcon className={styles.icon} />
          </button>
        </div>
        <div className={styles.lower} onClick={onClickComment}>
          <span className={styles.text}>자세히</span>
          <button className={styles.moveDetail} type="button" name="move">
            <DoubleChevronRightIcon className={styles.icon} />
          </button>
        </div>
      </article>
      <article className={styles.layerDown}>
        <aside className={styles.top}>
          <div className={styles.left}>
            <p className={styles.title}>{title}</p>
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.right}>
            <SolidStarIcon className={styles.star} />
            {score}
          </div>
        </aside>
        <div className={styles.content}>{content}</div>
      </article>
      <ReviewModal
        className={styles.modifyModal}
        modalOpen={modifyModalOpen}
        setModalOpen={setModifyModalOpen}
        buttonChildren="수정"
        onClick={onPatchReview}
      >
        <main className={styles.modifyMain}>
          <Stars
            className={styles.star}
            value={modifiedReview.score * 2}
            onChange={setModifiedReview}
          />
          <div className={styles.inputWrap}>
            <textarea
              className={styles.textarea}
              value={modifiedReview.content}
              onChange={onChangeModifiedReview}
            />
          </div>
        </main>
      </ReviewModal>
      <ReviewModal
        className={styles.deleteModal}
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        buttonChildren="삭제"
        onClick={onClickDeleteReview}
      >
        리뷰를 삭제하시겠습니까?
      </ReviewModal>
    </section>
  );
};
export default Review;
