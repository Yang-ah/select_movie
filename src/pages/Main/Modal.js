import React, { useEffect, useRef } from 'react';

import Comment from '../../components/Comment';
import dummy from "../../mock_comment.json";

import styles from './modal.module.scss'

import { motion , AnimatePresence } from "framer-motion";


const Modal1 = ({movieInfo , onModalClose, setIsShow, isShow , onOver}) => {

    const { title , postImage , id} = movieInfo;

    const backdropVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
        exit : {opacity : 0},
        
      };
      
      const modalVariants = {
        hidden: {
          y: "50",
          opacity: 0,
          scale : 0.3,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        visible: {
          y: "10",
          opacity: 1,
          scale : 1,
          backgroundColor: "#fff",
          transition: {
            stiffness: 200, damping: 20, duration: 0.3,
          }
        },
        exit : {
          y : "50",
          opacity : 0,
          scale : 0.3,

        }
      };

    const modalRef1 = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef1.current && !modalRef1.current.contains(event.target)) {
                setIsShow(false);
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
      <AnimatePresence>
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
        <motion.div
            className="modal"
            variants={modalVariants}
          >
        <div
        ref={modalRef1} 
        className={styles.modal} onMouseOver={() => onOver=(id)}>
            <div className={styles.popup}>
                <img className={styles.popupBackground} src={postImage} alt={title} />
                <div 
                className={styles.popupBody}>
                    <div>
                     <img className={styles.thumbUrl} src={postImage} alt={title} />
                    </div>
                        <div>
                             <ul>
                                <div className={styles.popupMainContent}>
                                <li><h1 className={styles.popupMainHead}>{title}</h1></li>
                                </div>
                                <div className={styles.popupSubHead }>
                                </div>
                            </ul>
                         </div>
                    </div>   
                <div className={styles.commentHead}>c o m m e n t</div>
                <p className={styles.close} onClick={onModalClose}>
                x
                </p>
                
                <Comment
                    className={styles.comment}
                    type="preview"
                    key={dummy[0].userName + "2"}
                    userName={dummy[0].userName}
                    comment={dummy[0].comment}
                    // date={dummy[0].date} TODO : 넣을지 상의
                    rating={dummy[0].rating}
                    />
                    <Comment
                    className={styles.comment}
                    type="preview"
                    key={dummy[0].userName + "2"}
                    userName={dummy[0].userName}
                    comment={dummy[0].comment}
                    // date={dummy[0].date} TODO : 넣을지 상의
                    rating={dummy[0].rating}
                    />
                
            </div>
        </div>
        </motion.div>
        </motion.div>
        </AnimatePresence>
    );
};
 
export default Modal1;