import {React,useState} from "react";
import styles from "./infoBox.module.scss";

import Stars from "../../../components/Common/Stars";
import { SettingIcon } from "../../../assets/icon";
//컴포넌트 모달 호출
import { Modal } from '../../../components';

const Info = () => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  };
  return (
    <section className={styles.wrapper}>
      <article className={styles.info}>
        <div className={styles.img}>🤔</div>
        <div className={styles.text}>
          <div className={styles.infoTop}>
            <p className={styles.userName}>닉네임 (input시 10자 제한)</p>
            <div className={styles.setting}>
              <button className={styles.settingB}
                onClick={showModal}>
                <SettingIcon />
              </button>
              {/* <a href="/" className={styles.settingH}>
                <SettingIcon />
                <p>화원정보 수정</p>
              </a> */}
            </div>
          </div>
          <div className={styles.introduce}>
            소개 (input시 100자 제한) :
            다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다
            다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다
            다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다
          </div>
        </div>
      </article>
      <article className={styles.category}>
        <div className={styles.rating}>
          <p className={styles.top}>⭐평균 평점⭐</p>
          <p className={styles.middle}>
            <Stars />
          </p>
          <p className={styles.bottom}>총 num 개의 라뷰를 남겼어요!✏</p>
        </div>
        <div className={styles.isliked}>
          <p className={styles.top}>💛좋아요 표시한 영화 수💛</p>
          <p className={styles.middle}>num</p>
          <p className={styles.bottom}></p>
        </div>
        <div className={styles.review}>
          <p className={styles.top}>✍내가 남긴 리뷰 수✍</p>
          <p className={styles.middle}>num</p>
          <p className={styles.bottom}>🌝음~ 거의 전문가🌝</p>
        </div>
      </article>
      <Modal
        className={styles.modal}
        modalOpen1={modalOpen}
        setModalOpen={setModalOpen}
        children='여기에 내용이 들어갑니다' 
        buttonChildren='버튼 내용' />
    </section>
  );
};
export default Info;
