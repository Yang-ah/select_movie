 import { useState, useRef } from 'react';
import { Modal } from '../../components';

import { CSSTransition } from 'react-transition-group';
import './styles.css'; // transition-group styles
// 모달을 노출하는 페이지
function Modaltest() {
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);
    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    const nodeRef = useRef(null);

    return (
        <div>
            <div>모달테스트</div>
            <button onClick={showModal}>모달 띄우기</button>
        <CSSTransition
        in={modalOpen}
        nodeRef={nodeRef}
        timeout={300}
        classNames="modal"
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