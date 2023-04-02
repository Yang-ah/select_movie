import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./modal.module.scss";
import { Button } from "../../../components";

const InfoModal = ({
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

  //input관련.
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  //초기화
  const onReset = () => {
    setText("");
  };
  //상위컴포넌트로 넘김
  const submitText = () => {
    props.propFunction(text);
  };
  //textChangeHandler=onChange  currentTarget=target

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
        <section ref={modalRef} className={styles.container}>
          <header className={styles.title}>
            🤗 당신을 어떻게 소개하고 싶나요? 🤗
          </header>
          <input className={styles.content} value={text} onChange={onChange} />
          <footer className={styles.buttonBox}>
            <Button className={styles.cancelButton} onClick={closeModal}>
              취소
            </Button>
            <Button className={styles.resetButton} onClick={onReset}>
              초기화
            </Button>
            <Button className={styles.deleteButton} onClick={submitText}>
              완료
            </Button>
          </footer>
        </section>
      </div>
    </CSSTransition>
  );
};

export default InfoModal;
