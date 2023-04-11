import { useEffect, useRef } from 'react';
import styles from './cmsModal.module.scss';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';

const CmsModal = ({
  className,
  title,
  children,
  modalOpen1,
  setModalOpen,
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
        closeModal(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  });

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
        <section ref={modalRef} className={cx(styles.container, className)}>
          <div className={styles.content}>{children}</div>
        </section>
      </div>
    </CSSTransition>
  );
};

export default CmsModal;