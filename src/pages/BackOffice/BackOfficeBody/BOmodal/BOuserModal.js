/*
{
  "email": "string | null",
  "password": "string | null",
  "name": "string | null",
  "birth": "string | null",
  "nickname": "string | null",
  "description": "string | null",
  "profileImage": "string | null",
  "isPublic": "boolean | null",
  "preferredGenres": "string[] | null",
  "gender": [
    "MALE",
    "FEMALE"
  ]
}
*/
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from '../../../../components';
import styles from './BOmovieModal.module.scss';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import { patchUserAdmin } from '../../../../api/Users';

const BOuserModal = ({
  className,
  option,
  buttonChildren,
  modalOpen,
  setModalOpen,
  ID,
  selectedData,
  setSelectedIDs,
}) => {
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);
  const [postForm, setPostForm] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    nickname: '',
    description: '',
  });

  const closeModal = () => {
    setSelectedIDs([]);
    setPostForm({
      email: '',
      password: '',
      name: '',
      birth: '',
      nickname: '',
      description: '',
    });
    setModalOpen(false);
    responseData();
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setPostForm({ ...postForm, [name]: value });
  };

  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();
    try {
      const responsePatch = await patchUserAdmin(ID, postForm);
      if (responsePatch.status === 204) {
        alert('수정완료');
        responseData();
      }
    } catch (err) {
      const errData = err.response.data;
      alert(errData.message);
    }
  };

  useEffect(() => {
    setPostForm({
      email: selectedData.email,
      password: selectedData.password,
      name: selectedData.name,
      birth: selectedData.birth,
      nickname: selectedData.nickname,
      description: selectedData.description,
    });
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
        setSelectedIDs([]);
        setPostForm({
          email: '',
          password: '',
          name: '',
          birth: '',
          nickname: '',
          description: '',
        });
        responseData();
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  }, [modalOpen]);
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
                label="이메일"
                onChange={onChange}
                name="email"
                value={postForm.email}
              />
              <Input
                className={styles.inputClass}
                label="비밀번호"
                onChange={onChange}
                name="password"
                value={postForm.password}
              />
              <Input
                className={styles.inputClass}
                label="이름"
                onChange={onChange}
                name="name"
                value={postForm.name}
              />
              <Input
                className={styles.inputClass}
                label="닉네임"
                onChange={onChange}
                name="nickname"
                value={postForm.nickname}
              />
              <Input
                className={styles.inputClass}
                label="생일"
                onChange={onChange}
                name="birth"
                value={postForm.birth}
              />
              <li className={styles.labelText}>상세</li>
              <textarea
                className={styles.textArea}
                label="상세"
                onChange={onChange}
                name="description"
                value={postForm.description}
              />
            </ul>
          </div>

          <footer className={styles.buttonBox}>
            <Button
              className={styles.cancelButton}
              children={'취소'}
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

export default BOuserModal;
