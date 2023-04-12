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
import { useEffect, useState } from 'react';
import useMe from '../../../../hooks/useMe';

const HeaderRightButtons = ({ reviewId }) => {
  const me = useMe();
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
    if (!me) {
      return alert('로그인 후 이용 가능합니다!');
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
  }, [me]);

  return (
    <div className={cx(styles.upDown)}>
      <button
        name="isLiked"
        onClick={onClick}
        className={cx({ [styles.clicked]: me && isLikedHated.isLiked })}
      >
        <ThumbsUpIcon />
        {likeHateCount.likeCount}
      </button>

      <button
        name="isHated"
        onClick={onClick}
        className={cx({ [styles.clicked]: me && isLikedHated.isHated })}
      >
        <ThumbsDownIcon />
        {likeHateCount.hateCount}
      </button>
    </div>
  );
};
export default HeaderRightButtons;
