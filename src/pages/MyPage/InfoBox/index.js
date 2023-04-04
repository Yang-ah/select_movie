import React, { useState } from "react";
import styles from "./infoBox.module.scss";
import useMe from "../../../hooks/useMe";
import { isLoginAtom } from "../../../atom";
import { useRecoilValue } from "recoil";

import Stars from "../../../components/Common/Stars";
import { SettingIcon } from "../../../assets/icon";
import InfoModal from "../InfoModal";
import grade from "../../../mock_grade.json";

const Info = () => {
  const me = useMe();
  const isLogin = useRecoilValue(isLoginAtom);

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const modalInput = (text) => {
    console.log(text);
  };

  return (
    <section className={styles.wrapper}>
      <article className={styles.info}>
        <div className={styles.img}>🤔</div>

        <div className={styles.text}>
          <div className={styles.infoTop}>
            <p className={styles.userName}>{me && isLogin && me.name}</p>
            {isLogin && (
              <button
                className={styles.setting}
                type="submit"
                value="modify"
                onClick={showModal}
              >
                <SettingIcon />
              </button>
            )}
            <InfoModal
              className={styles.inputModal}
              modalOpen1={modalOpen}
              setModalOpen={setModalOpen}
              notion="소개글 수정"
              buttonChildren="완료"
            />
          </div>
          <div className={styles.introduce}>소개글</div>
        </div>
      </article>
      <article className={styles.category}>
        <div className={styles.rating}>
          <p className={styles.top}>⭐ 평균 평점 ⭐</p>
          <p className={styles.middle}>
            <Stars />
          </p>
          <p className={styles.bottom}>총 num 개의 라뷰를 남겼어요!✏</p>
        </div>
        <div className={styles.isliked}>
          <p className={styles.top}>💛 좋아요 표시한 영화 수 💛</p>
          <p className={styles.middle}>num</p>
          <p className={styles.bottom}></p>
        </div>
        <div className={styles.review}>
          <p className={styles.top}>✍ 내가 남긴 리뷰 수 ✍</p>
          <p className={styles.middle}>num</p>
          <p className={styles.bottom}>{grade.index === "1"}</p>
        </div>
      </article>
    </section>
  );
};
export default Info;
