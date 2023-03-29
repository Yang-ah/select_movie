import React from "react";
import Comment from "../../components/Comment";
import styles from "./modal.module.scss";
import dummy from "../../mock_comment.json";

//NOTE: 만들어둔 Modal 사용
const Modal = ({ onClose, movieInfo }) => {
  const {
    thumbUrl,
    movieNm,
    endYearDate,
    watchGradeNm,
    showTs,
    repNationCd,
    genre,
    synop,
  } = movieInfo;

  return (
    <section style={{ backgroundImage: { thumbUrl } }} className={styles.modal}>
      <div className={styles.bg}></div>
      <div className={styles.popup}>
        <div className={styles.popupBody}>
          <div>
            <img className={styles.thumbUrl} src={thumbUrl} alt={movieNm} />
          </div>
          <div>
            <ul>
              <div className={styles.popupMainContent}>
                <li>
                  <h1 className={styles.popupMainHead}>{movieNm}</h1>
                </li>
                <li>
                  {endYearDate} {genre} {repNationCd}
                </li>
              </div>
              <div className={styles.popupSubHead}>
                <p className={styles.popupSubContent}>{synop}</p>
                <br />#{showTs} #{genre} #{watchGradeNm}#{genre} #{endYearDate}
              </div>
            </ul>
          </div>
        </div>
        <p className={styles.close} onClick={onClose}>
          X
        </p>
        <Comment
          // NOTE: className은 소문자 시작
          className={styles.Comment}
          type="preview"
          key={dummy[0].userName + "2"}
          userName={dummy[0].userName}
          comment={dummy[0].comment}
          // date={dummy[0].date} TODO : 넣을지 상의
          rating={dummy[0].rating}
        />
      </div>
    </section>
  );
};

export default Modal;
