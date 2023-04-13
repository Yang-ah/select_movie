import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reviewCard.module.scss';
import { SolidStarIcon, ModifyIcon, TrashIcon } from '../../../assets/icon';

import cx from 'classnames';
import {
  HeaderLeft,
  HeaderRightRating,
  HeaderRightButtons,
} from '../../../components/Comment/_shared';
import useMe from '../../../hooks/useMe';
import { isLoginAtom } from '../../../atom';
import { useRecoilValue } from 'recoil';
import { deleteReview, getReviewsMe, patchReview } from '../../../api/Reviews';
import Stars from '../../../components/Common/Stars';
import Button from '../../../components/Common/Button';

const Review = ({
  title,
  createdAt,
  reviewId,
  content,
  score,
  fetchMyReviews,
}) => {
  const [postForm, setPostForm] = useState({
    content: '',
    score: '',
  });

  const { me } = useMe();
  const isLogin = useRecoilValue(isLoginAtom);
  const [isUserMe, setIsUserMe] = useState(false);
  const [canModify, setCanModify] = useState(false);
  const [modifiedReview, setModifiedReview] = useState({
    content: me?.content,
    score: me?.score,
  });
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    isMyReview();
  }, [isLogin, me]);

  const isMyReview = async () => {
    const response = await getReviewsMe(movieId);
    response.data && setIsUserMe(response.data.user.id === written);
  };
  const onClickDelete = () => {
    setModalOpen(true);
  };
  const onClickDeleteReview = async () => {
    await deleteReview(reviewId);
    await fetchMyReviews();
    setModalOpen(false);
  };

  const onClickModify = () => {
    setCanModify(true);
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
        <button className={styles.fixModal}>
          <ModifyIcon className={styles.icon} />
        </button>
        <button className={styles.deleteModal}>
          <TrashIcon className={styles.icon} />
        </button>
      </article>
      <article className={styles.layerDown}>
        <aside className={styles.top}>
          <div className={styles.left}>
            <p className={styles.title}>title : {title}</p>
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.right}>
            <SolidStarIcon className={styles.star} />
            {score}
          </div>
        </aside>

        {canModify || <main>{content}</main>}
        {canModify && (
          <main className={styles.modifyMain}>
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

        <button type="button" name="modify" onClick={onClickModify}>
          <ModifyIcon width={'40px'} fill="pink" />
        </button>
        <button type="button" name="delete" onClick={onClickDelete}>
          <TrashIcon width={'40px'} fill="pink" />
        </button>
      </article>
    </section>
  );
};

export default Review;
