import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import styles from './deleteModal.modal.module.scss';
import useMe from '../../../hooks/useMe';
import { Button, Input } from '../../../components';
import { deleteReview } from '../../../api/Reviews';

export const DeleteModal = ({
  className,
  modalOpen,
  setModalOpen,
  buttonChildren,
  onClick,
}) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async () => {
    await deleteReview(reviewId);
    await fetchReviews();
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
