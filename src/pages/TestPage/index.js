 import { useState } from 'react';
import { Modal } from '../../components';

import { CSSTransition } from 'react-transition-group';
import styles from './modal.module.scss';
// 모달을 노출하는 페이지
function Modaltest() {
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);
    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div>
            <div>모달테스트</div>
            <button onClick={showModal}>모달 띄우기</button>
        <CSSTransition
        in={modalOpen}
        timeout={300}
        classNames={{
            enterActive: styles.modalEnterActive,
            enterDone: styles.modalEnterDone,
            exitActive: styles.modalExit,
            exitDone: styles.modalExitActive
          }}
        >
        <Modal
            view={modalOpen}
            setModalOpen={setModalOpen} 
            children='1' 
            buttonChildren='2' />
        </CSSTransition>
            
        </div>
    );
}

export default Modaltest; 