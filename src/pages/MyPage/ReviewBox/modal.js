import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import styles from './modal.scss';
import useMe from '../../../hooks/useMe';
import { Button, Input } from '../../../components';
import { deleteReview } from '../../../api/Reviews';
import Review from '../ReviewCard';

import { Link } from 'react-router-dom';
import { SolidStarIcon, ModifyIcon, TrashIcon } from '../../../assets/icon';

const ModiModal = ({
  id,
  title,
  content,
  createdAt,
  score,
  showFixModal,
  showDeleteModal,

  className,
  option,
  buttonChildren,
  modalOpen,
  setModalOpen,
  ID,
  selectedData,
  setSelectedIDs,
}) => {
  // Modal 창을 useRef로 취득
  const me = useMe();
  const modalRef = useRef(null);
  const [postForm, setPostForm] = useState({
    content: '',
    score: '',
  });

  const closeModal = () => {
    setSelectedIDs([]);
    setPostForm({
      content: '',
      score: '',
    });
    setModalOpen(false);
    responseData();
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setPostForm({ ...postForm, [name]: value });
  };

  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();
    try {
      const responsePatch = await deleteReview(ID, postForm);
      if (responsePatch.status === 200) {
        alert('수정완료');
        responseData();
      }
    } catch (err) {
      const errData = err.response.data;
      if (errData.statusCode !== 200) {
        alert(errData.message);
      }
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
        setSelectedIDs([]);
        setPostForm({
          content: '',
          score: '',
        });
        responseData();
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
        <section
          ref={modalRef}
          className={cx(styles.container, className, styles[option])}
        >
          <header className={styles.title}>리뷰 삭제</header>
          <section className={styles.screen}>
            <article className={styles.layerDown}>
              <aside className={styles.top}>
                <div className={styles.left}>
                  <p className={styles.title}>title : {title}</p>
                  <p className={styles.createdAt}>{createdAt}</p>
                </div>
                <div className={styles.right}>
                  <SolidStarIcon
                    className={styles.star}
                    width={'20px'}
                    fill="yellow"
                  />
                  {score}
                </div>
              </aside>
              <p className={styles.content}>{content}</p>
              <footer className={styles.buttonBox}>
                <button className={styles.fixModal} onClick={showFixModal}>
                  <ModifyIcon
                    className={styles.icon}
                    width={'20px'}
                    fill="red"
                  />
                </button>
              </footer>
            </article>
          </section>
        </section>
      </div>
    </CSSTransition>
  );
};

export default ModiModal;
