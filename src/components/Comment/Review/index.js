import styles from "./review.module.scss";
import cx from "classnames";
import { HeaderLeft, HeaderRightRating, HeaderRightButtons } from "../_shared";
import { useEffect, useState } from "react";
import useMe from "../../../hooks/useMe";
import { isLoginAtom } from "../../../atom";
import { useRecoilValue } from "recoil";
import { ModifyIcon, TrashIcon } from "../../../assets/icon";
import Modal from "../../Common/Modal";
import { deleteReview } from "../../../api/Reviews";

const Review = ({
  comment,
  userName,
  date,
  rating,
  up = 0,
  down = 0,
  reviewId,
  written,
  className,
}) => {
  const me = useMe();

  const isLogin = useRecoilValue(isLoginAtom);
  const [isUserMe, setIsUserMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    isUserMeToggle();
  }, [isLogin, me]);

  const isUserMeToggle = () => {
    if (isLogin && me && me.id === written) {
      setIsUserMe(true);
    }
  };
  const onClickDelete = () => {
    setModalOpen(true);
  };

  const onClickDeleteReview = () => {
    deleteReview(reviewId);
    setModalOpen(false);

    // window.location.reload(); 새로고침:로그인 해제됨
  };

  return (
    <section className={cx(styles.wrap, { [styles.myReview]: isUserMe })}>
      <header>
        <HeaderLeft type="review" userName={userName} date={date} />
        <article className={styles.right}>
          <HeaderRightRating rating={rating} />
          <HeaderRightButtons up={up} down={down} type="review" />
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
