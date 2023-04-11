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
import { deleteUser } from '../../../../api/Users';
import { deleteReviewAdmin } from '../../../../api/Reviews';

const BOdeleteModal = ({
  className,
  option,
  buttonChildren,
  modalOpen2,
  setModalOpen2,
  ID,
  setSelectedIDs,
  userORreview,
}) => {
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);

  const closeModal = () => {
    setSelectedIDs([]);
    setModalOpen2(false);
    responseData();
  };
  console.log(ID);
  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();

    if (userORreview === 'review') {
      try {
        const response2 = await deleteReviewAdmin(ID);
        if (response2.status === 204) {
          alert('리뷰를 삭제를 완료했습니다.');
          closeModal();
        }
      } catch (err) {
        const errData = err.response.data;
        alert(errData.message);
      }
    }

    if (userORreview === 'user') {
      try {
        const response = await deleteUser(ID);
        if (response.status === 204) {
          alert('회원을 삭제를 완료했습니다.');
          closeModal();
        }
      } catch (err) {
        const errData = err.response.data;
        alert(errData.message);
      }
    }
  };

  useEffect(() => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen2(false);
        setSelectedIDs([]);
        responseData();
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  }, [modalOpen2]);

  return (
    <CSSTransition
      in={modalOpen2}
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
              <li>삭제하시겠습니까?</li>
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

export default BOdeleteModal;
