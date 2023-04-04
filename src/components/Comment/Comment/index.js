import styles from "./comment.module.scss";
import cx from "classnames";
import { HeaderLeft, HeaderRightButtons } from "../_shared";
import useMe from "../../../hooks/useMe";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../../atom";
import { useEffect, useState } from "react";
import { ModifyIcon, TrashIcon } from "../../../assets/icon";
import Modal from "../../Common/Modal";
import { deleteReviewComment } from "../../../api/Reviews";

const Comment = ({
  comment,
  userName,
  date,
  up = 0,
  down = 0,
  className,
  commentId,
  written,
  fetchReviews,
  ...props
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
    deleteReviewComment(commentId);
    fetchReviews();
    setModalOpen(false);
  };

  return (
    <section className={cx(styles.wrap, { [styles.myComment]: isUserMe })}>
      <header>
        <HeaderLeft type="comment" userName={userName} date={date} />

        <article className={styles.right}>
          <HeaderRightButtons up={up} down={down} type="comment" />

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
                댓글을 삭제하시겠습니까?
              </Modal>
            </div>
          )}
        </article>
      </header>

      <main>{comment}</main>
    </section>
  );
};

export default Comment;
