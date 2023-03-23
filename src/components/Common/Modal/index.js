import { useEffect, useRef } from 'react';
import styles from './modal.module.scss';
import Button from '../Button';

const Modal = ({ setModalOpen, children, buttonChildren })=>{
    const closeModal = () => {
        setModalOpen(false);
    };

    // Modal 창을 useRef로 취득
    const modalRef = useRef(null);
    
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

    return (
        <div ref={modalRef} className={styles.container}>
            <div className={styles.title}>안내</div>
            <div className={styles.content}>{children}</div>
            <div className={styles.buttonBox}>
                <Button className={styles.cancleButton}
                 children={'취소'}
                 onClick={closeModal}/>
                <Button className={styles.deleteButton} children={buttonChildren}/>
            </div>
        </div>
    );
}
export default Modal;