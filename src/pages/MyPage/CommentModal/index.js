import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./modal.module.scss";
import { Button, Input } from "../../../components";

export const FixModal = ({
  modalOpen1,
  setModalOpen,
  children,
  notion,
  content,
  buttonChildren,
  ...props
}) => {
  const modalRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });
  //console.log(`컴포넌트 모달오픈${modalOpen1}`)
  //if(modalOpen1===false){return null}

  //input관련임.
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onReset = () => {
    setText("");
  };

  return (
    <CSSTransition
      in={modalOpen1}
      timeout={300}
      classNames={{
        enterActive: styles.modalEnterActive,
        enterDone: styles.modalEnterDone,
        exitActive: styles.modalExit,
        exitDone: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.overlay}>
        <section ref={modalRef} className={styles.containerFix}>
          <header className={styles.titleFix}>리뷰 수정</header>
          <Input
            className={styles.contentFix}
            onChange={onChange}
            value={text}
          />
          <footer className={styles.buttonBox}>
            <Button className={styles.cancelButton} onClick={closeModal}>
              취소
            </Button>
            <Button className={styles.resetButton} onClick={onReset}>
              초기화
            </Button>
            <Button className={styles.deleteButton} children={buttonChildren} />
          </footer>
        </section>
      </div>
    </CSSTransition>
  );
};

export const DeleteModal = ({
  modalOpen1,
  setModalOpen,
  children,
  notion,
  content,
  buttonChildren,
  ...props
}) => {
  const modalRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });
  //console.log(`컴포넌트 모달오픈${modalOpen1}`)
  //if(modalOpen1===false){return null}

  return (
    <CSSTransition
      in={modalOpen1}
      timeout={300}
      classNames={{
        enterActive: styles.modalEnterActive,
        enterDone: styles.modalEnterDone,
        exitActive: styles.modalExit,
        exitDone: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.overlay}>
        <section ref={modalRef} className={styles.containerDelete}>
          <header className={styles.titleDelete}>리뷰 삭제</header>
          <main className={styles.contentDelete}>
            리뷰를 삭제 하시겠습니까?
          </main>
          <footer className={styles.buttonBox}>
            <Button className={styles.cancelButton} onClick={closeModal}>
              취소
            </Button>
            <Button className={styles.deleteButton} children={buttonChildren} />
          </footer>
        </section>
      </div>
    </CSSTransition>
  );
};
