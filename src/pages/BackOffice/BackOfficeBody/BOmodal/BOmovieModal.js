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
import { patchMovie } from "../../../../api/Movies";

const BOmovieModal = ({
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
      title:'',
      plot:'',
      releasedAt:'',
      runtime:'',
      company:''
    }
  );
  
  const closeModal = ()=>{
    setSelectedIDs([]);
    setPostForm({title:'',plot:'',releasedAt:'',runtime:'',company:''})
    setModalOpen(false);
  }
  

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setPostForm({ ...postForm, [name]: value });
  };

  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();
    patchMovie(ID,postForm);
    alert('수정완료')
  };

  useEffect(() => {
    setPostForm({
      title:selectedData.title,
      plot:selectedData.plot,
      releasedAt:selectedData.releasedAt,
      runtime:selectedData.runtime,
      company:selectedData.company,
    });
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false); setSelectedIDs([]);
        setPostForm({title:'',plot:'',releasedAt:'',runtime:'',company:''})
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
            label="영화제목"
            onChange={onChange}
            name="title"
            value={postForm.title}
          />
        <li className={styles.labelText}>줄거리</li>
        <textarea 
            className={styles.textArea}
            label="줄거리"
            onChange={onChange}
            name="plot"
            value={postForm.plot}
          />
        <Input
            className={styles.inputClass}
            label="상영일"
            onChange={onChange}
            name="releasedAt"
            value={postForm.releasedAt}
          />
          <Input
            className={styles.inputClass}
            label='상영시간'
            onChange={onChange}
            name="runtime"
            value={postForm.runtime}
          />
          <Input
            className={styles.inputClass}
            label='제작사'
            onChange={onChange}
            name="company"
            value={postForm.company}
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

export default BOmovieModal;
