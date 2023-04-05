import styles from './headerRightButtons.module.scss';
import cx from 'classnames';
import { ThumbsUpIcon, ThumbsDownIcon } from '../../../../assets/icon';
import {
  createReviewHate,
  createReviewLike,
  deleteReviewHate,
  deleteReviewLike,
  getReviewDetail,
} from '../../../../api/Reviews';
import { isLoginAtom } from '../../../../atom';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

const HeaderRightButtons = ({ reviewId, commentId, type }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const [likeHateCount, setLikeHateCount] = useState({
    likeCount: 0,
    hateCount: 0,
  });

  const [isLikedHated, setIsLikedHated] = useState({
    isHated: false,
    isLiked: false,
  });

  const fetchReviewDetails = async () => {
    const response = await getReviewDetail(reviewId);

    setLikeHateCount({
      likeCount: response.data.likeCount,
      hateCount: response.data.hateCount,
    });

    setIsLikedHated({
      isLiked: response.data.isLiked,
      isHated: response.data.isHated,
    });
  };

  const onClick = async (e) => {
    if (!isLogin) {
      return alert('로그인 후 이용 가능합니다!');
    }
    if (type === 'comment') {
      return;
    }

    const { name } = e.currentTarget;

    if (name === 'isLiked') {
      isLikedHated.isLiked
        ? await deleteReviewLike(reviewId)
        : await createReviewLike(reviewId);
    }

    if (name === 'isHated') {
      isLikedHated.isHated
        ? await deleteReviewHate(reviewId)
        : await createReviewHate(reviewId);
    }

    await fetchReviewDetails();
  };

  useEffect(() => {
    reviewId && fetchReviewDetails();
  }, []);

  return (
    <div className={cx(styles.upDown, styles[type])}>
      <button
        name="isLiked"
        onClick={onClick}
        className={cx({ [styles.clicked]: isLogin && isLikedHated.isLiked })}
      >
        <ThumbsUpIcon />
        {likeHateCount.likeCount}
      </button>

      <button
        name="isHated"
        onClick={onClick}
        className={cx({ [styles.clicked]: isLogin && isLikedHated.isHated })}
      >
        <ThumbsDownIcon />
        {likeHateCount.hateCount}
      </button>
    </div>
  );
};
export default HeaderRightButtons;
