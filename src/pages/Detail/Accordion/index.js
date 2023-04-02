import React, { useEffect, useState } from "react";
import styles from "./accordion.module.scss";
import { ChevronUp } from "../../../assets/icon";
import Comment from "../../../components/Comment";
import cx from "classnames";
import dayjs from "dayjs";
import Input from "../../../components/Common/Input";
import useMe from "../../../hooks/useMe";
import { isLoginAtom } from "../../../atom";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

const Accordion = ({ review }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [reviewComments, setReviewComments] = useState([]);
  const [newReview, setNewReview] = useState();
  const me = useMe();
  const isLogin = useRecoilValue(isLoginAtom);

  const onSubmit = (e) => {
    e.preventDefault();

    setReviewComments(() => {
      return {
        ...reviewComments,
        new: {
          content: newReview,
          createdAt: 20230101,
          id: new Date().getMilliseconds(),
          user: {
            name: me && (me["name"] ?? "이름없음"),
            nickname: me && (me["nickname"] ?? "닉네임없음"),
          },
        },
      };
    });
    //console.log(reviewComments);
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setNewReview(value);
  };

  useEffect(() => {
    setReviewComments(review.comments);
  }, []);

  return (
    <li className={cx(styles.accordionWrap)}>
      <Comment
        type="review"
        userName={review.user.nickname ?? review.user.name ?? "닉네임"}
        comment={review.content}
        date={dayjs(review.createdAt).format("YYYY.MM.DD")}
        rating={review.score}
        down={review.hateCount}
        up={review.likeCount}
      />

      {isLogin && (
        <div className={styles.reviewInputWrap}>
          <p className={styles.userName}>
            {me && (me["nickname"] ?? me["name"])}
          </p>
          <Input
            className={styles.input}
            placeholder="바르고 고운말~ㅇ.<"
            onChange={onChange}
            value={newReview}
          />
          <button type="button" onClick={onSubmit}>
            등록
          </button>
        </div>
      )}

      {isLogin || (
        <Link to="/auth/login">
          <div className={styles.logout}>
            ✨ 로그인 후 댓글 작성 가능합니다.
          </div>
        </Link>
      )}

      {/* ⬆댓글이 없는 리뷰는 comment, 댓글 input만 리턴 */}
      {/* ⬇댓글이 있는 리뷰는 아래 댓글들 accordion도 같이 리턴 */}

      {review.comments.length !== 0 && (
        <>
          <button
            className={cx(styles.showCommentsButton, {
              [styles.isShow]: isClicked,
            })}
            onClick={() => setIsClicked(!isClicked)}
          >
            댓글 {review.comments.length}
            <ChevronUp />
          </button>

          <article className={styles.commentWrap}>
            {reviewComments.map((comment) => {
              return (
                <Comment
                  type="comment"
                  key={comment.id}
                  comment={comment.content}
                  userName={
                    comment.user.nickname ?? comment.user.name ?? "댓글닉네임"
                  }
                  date={dayjs(comment.createdAt).format("YYYY.MM.DD")}
                />
              );
            })}
          </article>
        </>
      )}
    </li>
  );
};

export default Accordion;
