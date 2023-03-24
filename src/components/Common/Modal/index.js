import { useEffect, useRef } from 'react';
import styles from './modal.module.scss';
import './modal.scss';

import Button from '../Button';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ view, setModalOpen, children, buttonChildren })=>{
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
    if (!view) {
        return null;
    }
    return (
        <CSSTransition
        in={view}
        nodeRef={modalRef}
        classNames='modal'
        timeout={3000}
        >
        <div className={styles.overlay}>
            <section ref={modalRef} className={styles.container}>
                <header className={styles.title}>안내</header>
                <div className={styles.content}>{children}</div>
                <footer className={styles.buttonBox}>
                    <Button 
                        className={styles.cancleButton}
                        children={'취소'}
                        onClick={closeModal}/>
                    <Button 
                        className={styles.deleteButton} 
                        children={buttonChildren}/>
                </footer>
            </section>
        </div>
        </CSSTransition>
    );
}
export default Modal;