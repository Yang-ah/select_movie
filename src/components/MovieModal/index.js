import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./modal.module.scss";
import Comment from "../Comment";
import dummy from "../../mock_comment.json";
import { Link } from "react-router-dom";

const Modal1 = ({ movieInfo, onModalClose, setIsShow, isShow, moveDetail }) => {
  const modalRef1 = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef1.current && !modalRef1.current.contains(event.target)) {
        setIsShow(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames={{
        enterActive: styles.modalEnterActive,
        enterDone: styles.modalEnterDone,
        exitActive: styles.modalExit,
        exitDone: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.modal_overlay}>
        <div ref={modalRef1} className={styles.modal}>
          <div className={styles.popup}>
            <img
              className={styles.popupBackground}
              src={movieInfo.postImage}
              alt={movieInfo.title}
            />
            <div className={styles.popupBody}>
              <div>
                <img
                  className={styles.thumbUrl}
                  src={movieInfo.postImage}
                  alt={movieInfo.title}
                />
              </div>
              <div>
                <ul>
                  <div className={styles.popupMainContent}>
                    <li>
                      <h1 className={styles.popupMainHead}>
                        {movieInfo.title}
                      </h1>
                    </li>
                  </div>
                  <div className={styles.popupSubHead}></div>
                </ul>
              </div>
            </div>
            <div className={styles.commentHead}>c o m m e n t</div>
            <p className={styles.close} onClick={onModalClose}>
              x
            </p>
            <Link to="detail/{id}">
              <p className={styles.moveDetail}>{">>"}</p>
            </Link>
            <Comment
              className={styles.comment}
              type="preview"
              key={dummy[0].userName + "2"}
              userName={dummy[0].userName}
              comment={dummy[0].comment}
              // date={dummy[0].date} TODO : 넣을지 상의
              rating={dummy[0].rating}
            />
            <Comment
              className={styles.comment}
              type="preview"
              key={dummy[0].userName + "2"}
              userName={dummy[0].userName}
              comment={dummy[0].comment}
              // date={dummy[0].date} TODO : 넣을지 상의
              rating={dummy[0].rating}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal1;
