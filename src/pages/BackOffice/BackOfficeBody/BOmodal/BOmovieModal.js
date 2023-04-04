/*
{
  "title": "string | null",
  "plot": "string | null",
  "releasedAt": "string | null",
  "rating": "string | null",
  "runtime": "string | null",
  "company": "string | null",
  "genres": "string[] | null",
  "staffs": [
    {
      "name": "string",
      "role": "string"
    }
  ],
  "actors": "string[] | null"
}
*/
import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "../../../../components";
import styles from "./BOmovieModal.module.scss";
import { CSSTransition } from "react-transition-group";

import cx from "classnames";

const BOmovieModal = ({
  className,
  option,
  children,
  buttonChildren,
  modalOpen1,
  setModalOpen,
  onClick,
  num,
  ...props
}) => {
  // Modal 창을 useRef로 취득
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
    title: "title",
    plot: "plot",
    releasedAt: "releasedAt",
    rating: "rating",
    runtime: "runtime",
    company: "company",
    genres: "genres",
    staffs: [
      {
        name: "string",
        role: "string",
      },
    ],
    actors: "actors",
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
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
          <header className={styles.title}>안내</header>
          <div className={styles.content}>
            <ul>
              <li>ID {num}</li>
              <Input
                className={styles.inputClass}
                label="영화제목"
                onChange={onChange}
                name="title"
                value={form.title}
              />
              <Input
                className={styles.inputClass}
                label="줄거리"
                onChange={onChange}
                name="plot"
                value={form.plot}
              />
              <Input
                className={styles.inputClass}
                label="상영일"
                onChange={onChange}
                name="releasedAt"
                value={form.releasedAt}
              />
              <Input
                className={styles.inputClass}
                label="평점"
                onChange={onChange}
                name="rating"
                value={form.rating}
              />
              <Input
                className={styles.inputClass}
                label="상영시간"
                onChange={onChange}
                name="runtime"
                value={form.runtime}
              />
              <Input
                className={styles.inputClass}
                label="제작사"
                onChange={onChange}
                name="company"
                value={form.company}
              />
              <Input
                className={styles.inputClass}
                label="genres"
                onChange={onChange}
                name="genres"
                value={form.genres}
              />
            </ul>
          </div>

          <footer className={styles.buttonBox}>
            <Button
              className={styles.cancelButton}
              children={"취소"}
              onClick={closeModal}
            />
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

export default BOmovieModal;
