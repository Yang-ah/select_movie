import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import styles from './reviewModal.modal.module.scss';
import useMe from '../../../hooks/useMe';
import { Button, Input } from '../../../components';
import { patchReview, deleteReview } from '../../../api/Reviews';
//modify
import {
  HeaderLeft,
  HeaderRightRating,
  HeaderRightButtons,
} from '../../../components/Comment/_shared';
import Stars from '../../../components/Common/Stars';

export const FixModal = ({
  fixModalOpen,
  setFixModalOpen,
  children,
  notion,
  content,
  buttonChildren,

  className,
}) => {
  const me = useMe();
  const modalRef = useRef(null);
  const [postForm, setPostForm] = useState({
    content: '',
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setPostForm({ ...postForm, [name]: value });
  };

  const closeModal = () => {
    setPostForm({
      content: '',
    });
    setModalOpen(false);
  };
  const onReset = (e) => {
    const { name } = e.currentTarget;
    setPostForm({ ...postForm, [name]: '' });
  };
  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();
    try {
      const responsePatch = await patchReview(postForm);
      if (responsePatch.status === 200) {
        alert('수정완료'); //not work...
        responseData();
      }
    } catch (err) {
      const errData = err.response.data;
      if (errData.statusCode !== 200) {
        alert(errData.message);
      }
    }
  };

  useEffect(() => {
    setPostForm({
      content: me && me.content,
    });
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setFixModalOpen(false);
        setPostForm({
          content: '',
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
  }, [fixModalOpen]);

  return (
    <CSSTransition
      in={fixModalOpen}
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
          <div className={styles.box}>
            <textarea
              className={styles.textarea}
              onChange={onChange}
              name="content"
              value={postForm.content}
              maxLength={300}
            />
            {/*}
            <Input
              className={styles.contentFix}
              onChange={onChange}
              value={text}
    />*/}
          </div>
          <footer className={styles.buttonBox}>
            <Button
              className={styles.cancelButton}
              children={'취소'}
              onClick={closeModal}
            />
            {/* <Button className={styles.resetButton} onClick={onReset}>
              초기화
            </Button> */}
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

export const DeleteModal = ({
  className,
  option,
  buttonChildren,
  deleteModalOpen,
  setDeleteModalOpen,
  userORreview,
}) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    setDeleteModalOpen(false);
  };
  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();

    //리뷰 삭제
    if (userORreview === 'review') {
      try {
        const response2 = await deleteReview();
        if (response2.status === 200) {
          alert('리뷰 삭제를 완료했습니다.');
          closeModal();
        }
      } catch (err) {
        const errData = err.response.data;
        if (errData.statusCode !== 200) {
          alert(errData.message);
        }
      }
    }
    //유저 삭제
    if (userORreview === 'user') {
      try {
        const response = await deleteUser();
        if (response.status === 200) {
          alert('회원을 삭제를 완료했습니다.');
          closeModal();
        }
      } catch (err) {
        const errData = err.response.data;
        if (errData.statusCode !== 200) {
          alert(errData.message);
        }
      }
    }
  };

  useEffect(() => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDeleteModalOpen(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  }, [deleteModalOpen]);

  return (
    <CSSTransition
      in={deleteModalOpen}
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
          <header className={styles.title}>리뷰 삭제</header>
          <main className={styles.content}>
            <li> 리뷰를 삭제 하시겠습니까?</li>
          </main>
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
