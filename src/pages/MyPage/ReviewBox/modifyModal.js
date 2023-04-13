import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import styles from './modifyModal.modal.module.scss';
import useMe from '../../../hooks/useMe';
import { Button, Input } from '../../../components';

import { patchReview, deleteReview } from '../../../api/Reviews';

export const ModifyModal = ({
  className,
  option,
  modalOpen,
  setModalOpen,
  buttonChildren,
  onClick,
  userORreview,
}) => {
  const { me } = useMe();
  const modalRef = useRef(null);
  const [postForm, setPostForm] = useState({
    content: '',
    score: '',
  });

  const closeModal = () => {
    setPostForm({
      content: '',
      score: '',
    });
    setModalOpen(false);
  };
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setPostForm({ ...postForm, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (postForm.score) {
    }
    try {
      const responsePatch = await patchReview(postForm);
      if (responsePatch.status === 204) {
        alert('수정완료');

        setModalOpen(false);
      }
    } catch (err) {
      const errData = err.response.data;
      alert(errData.message);
    }
  };

  useEffect(() => {
    setPostForm({
      content: me?.content,
      score: me?.score,
    });
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
        setPostForm({
          name: '',
          nickname: '',
          description: '',
        });
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
        <section ref={modalRef} className={cx(styles.container, className)}>
          <header className={styles.title}>리뷰 수정</header>
          <main className={styles.content}>
            <textarea
              className={styles.textArea}
              label="리뷰"
              onChange={onChange}
              name="content"
              value={postForm.content}
            />
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
