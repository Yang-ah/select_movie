import { useState } from 'react';
import { Modal } from '../../components';


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
            {modalOpen && <Modal setModalOpen={setModalOpen} />}
        </div>
    );
}

export default Modaltest;