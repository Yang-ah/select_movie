/*
{
  "content": "string | null",
  "score": "number | null"
}
*/
import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "../../../../components";
import styles from "./BOmovieModal.module.scss";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";
import { patchReviewAdmin } from "../../../../api/Reviews";

const BOreviewModal = ({
  className,
  option,
  buttonChildren,
  modalOpen,
  setModalOpen,
  ID,
  selectedData,
  setSelectedIDs
}) => {
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);
    const [postForm, setPostForm] = useState(
    {
      content: "",
      score: "",
    }
  );

  const closeModal = ()=>{
    setSelectedIDs([]);
    setPostForm({
      content: "",
      score: "",})
    setModalOpen(false);
    responseData();
  }
  

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setPostForm({ ...postForm, [name]: value });
  };

  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();
    try{
      const responsePatch = await patchReviewAdmin(ID,postForm);
      if(responsePatch.status===200){
        alert('수정완료');
        responseData();
      }
    } catch(err) {
      const errData = err.response.data;
      if (errData.statusCode !== 200){
        alert(errData.message);
      }
    }
  };

  useEffect(() => {
    setPostForm({
      content: selectedData.content,
      score: selectedData.score,
    });
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false); setSelectedIDs([]);
        setPostForm({
          content: "",
          score: "",
        })
        responseData();
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  },[modalOpen]);
return (
<CSSTransition
  in={modalOpen}
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
      <ul className={styles.inputForm}>
        <li>ID : {ID}</li>
        <Input
            className={styles.inputClass}
            label="별점"
            onChange={onChange}
            name="score"
            value={postForm.score}
          />
          <li className={styles.labelText}>리뷰</li>
          <textarea 
            className={styles.textArea}
            label="리뷰"
            onChange={onChange}
            name="content"
            value={postForm.content}
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
          onClick={onSubmit}
        />
      </footer>
    </section>
  </div>
</CSSTransition>
);
};

export default BOreviewModal;
