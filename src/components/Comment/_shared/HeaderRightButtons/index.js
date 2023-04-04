import styles from "./headerRightButtons.module.scss";
import cx from "classnames";
import { ThumbsUpIcon, ThumbsDownIcon } from "../../../../assets/icon";
import {
  createReviewLike,
  deleteReviewHate,
  getReviewDetail,
} from "../../../../api/Reviews";
import { isLoginAtom } from "../../../../atom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

// 개발중입니다 ~!
const HeaderRightButtons = ({ like, hate, reviewId, type }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const [likeHateCount, setLikeHateCount] = useState({
    like: 0,
    hate: 0,
  });

  const fetchReviewDetails = async () => {
    const response = await getReviewDetail(reviewId);
    // console.log(response.data);
    /*isHated:false, 
    isLiked:false,
    hateCount:0,
    likeCount:0 */
  };

  useEffect(() => {
    setLikeHateCount({
      like: like,
      hate: hate,
    });
    fetchReviewDetails();
  }, []);

  const onClick = (e) => {
    if (!isLogin) {
      return alert("로그인 후 이용 가능합니다!");
    }
    if (type === "comment") {
      return;
    }

    const { name } = e.currentTarget;
  };

  return (
    <>
      <div className={cx(styles.upDown, styles[type])}>
        <button name="like" onClick={onClick}>
          <ThumbsUpIcon />
          {likeHateCount.like}
        </button>
        <button name="hate" onClick={onClick}>
          <ThumbsDownIcon />
          {likeHateCount.hate}
        </button>
      </div>
    </>
  );
};
export default HeaderRightButtons;
