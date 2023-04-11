import { useEffect, useRef } from 'react';
import styles from './modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import Button from '../../../../components/Common/Button';
import cx from 'classnames';

const Modal = ({
  className,
  option,
  children,
  buttonChildren,
  modalOpen1,
  setModalOpen,
  onClick,
  createdAt,
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
    document.addEventListener('mousedown', handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  });
  //console.log(`컴포넌트 모달오픈${modalOpen1}`)
  //if(modalOpen1===false){return null}
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
          <main>
            <p className={styles.date}>{createdAt}</p>
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
              onClick={onClick}
            />
          </footer>
        </section>
      </div>
    </CSSTransition>
  );
};

export default Modal;