import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./modal.module.scss";
import cx from "classnames";
import { Button, Input } from "../../../components";
import { TrashIcon } from "../../../assets/icon";
import { getUsersMeInfo } from "../../../api/Users";

const InfoModal = ({
  className,
  option,
  children,
  buttonChildren,
  modalOpen1,
  setModalOpen,
  onClick,
  num,
  notion, //
  content, //
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

  const [form, setForm] = useState({
    name: "name",
    description: "description",
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };
  const onReset = (e) => {
    const { name } = e.currentTarget;
    setForm({ ...form, [name]: "" });
  };
  //  const submitText = () => {
  //    props.propFunction(name);
  //    props.propFunction(description);
  //  };
  //textChangeHandler=onChange  currentTarget=target

  const onSubmit = async (e) => {
    e.preventDefault();
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
        <section
          ref={modalRef}
          className={cx(styles.container, className, styles[option])}
        >
          <header className={styles.title}>
            🤗 당신을 어떻게 소개하고 싶나요? 🤗
          </header>
          <main className={styles.content}>
            <ul>
              <p className={styles.label}>이름</p>
              <input
                className={styles.name}
                label="namess"
                onChange={onChange}
                name="name"
                value={form.name}
                maxLength={10}
              />
              <p className={styles.label}>소개글</p>
              <input
                className={styles.description}
                label="description"
                onChange={onChange}
                name="description"
                value={form.description}
                maxLength={100}
              />
            </ul>
            <button className={styles.deleteUser}>
              <TrashIcon />
              계정을 삭제하시겠습니까?
            </button>
          </main>

          <footer className={styles.buttonBox}>
            <Button
              className={styles.cancelButton}
              children={"취소"}
              onClick={closeModal}
            />
            <Button className={styles.resetButton} onClick={onReset}>
              초기화
            </Button>
            <Button
              className={styles.deleteButton}
              children={buttonChildren}
              onClick={onClick}
            />
          </footer>
        </section>
      </div>
    </CSSTransition>
  );
};

export default InfoModal;
