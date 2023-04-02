import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./modal.module.scss";

import Comment from "../../components/Comment";
import dummy from "../../mock_comment.json";
import { Link } from "react-router-dom";

import {
  DoubleChevronRightIcon
} from "../../assets/icon";

import { getMovie } from "../../api/Movies";


const Modal1 = ({ movieInfo, onModalClose, setIsShow, isShow , id }) => {

  const [moviedata , setMovieData] = useState();

const responseData = async ()=>{
    const response1 = await getMovies(page,20);
  
    setMovieData({
        id : response1.data.data[i].id,
        title : response1.data.data[i].title,
        releasedAt : response1.data.data[i].releasedAt,
        averageScore : response1.data.data[i].averageScore,
    })
  }
  useEffect(()=>{
    responseData();
  },[page]);
  

  
  const modalRef1 = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef1.current && !modalRef1.current.contains(event.target)) {
        setIsShow(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames={{
        enterActive: styles.modalEnterActive,
        enterDone: styles.modalEnterDone,
        exitActive: styles.modalExit,
        exitDone: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.modal_overlay}>
      <div ref={modalRef1} className={styles.modal}>
        <div className={styles.popup}>
          <img
            className={styles.popupBackground}
            src={movieInfo.postImage}
            alt={movieInfo.title}
          />
          <div className={styles.popupBody}>
            <div>
              <img
                className={styles.thumbUrl}
                src={movieInfo.postImage}
                alt={movieInfo.title}
              />
            </div>
            <div className={styles.rightWrap}>
              <div className={styles.info}>
                <h1>
                  {movieDetail?.title} <p>{movieDetail?.runtime}분</p>
                </h1>
                <h2>

                  {movieDetail?.genres.map((genre) => {
                    return <span key={genre.id}> {genre.name} /</span>;
                  })}
                </h2>

                <h3>
                  | 작품정보 |<p>{movieDetail?.plot}</p>
                </h3>

                <h3 className={styles.actors}>
                  | 출연 |
                  <p>
                    {movieDetail?.actors.map((actor) => {
                      return <span key={actor.id}> {actor.name} </span>;
                    })}
                  </p>
                </h3>

                <h3 className={styles.actors}>
                  | 제작 / 스태프 |
                  <p>
                    <span>{movieDetail?.company} / </span>
                    {movieDetail?.staffs.map((staff) => {
                      return <span key={staff.id}> {staff.name} </span>;
                    })}
                  </p>
                </h3>
              </div>
              </div>
              </div>
          <div className={styles.commentHead}>c o m m e n t</div>
          <p className={styles.close} onClick={onModalClose}>
            x
          </p>
          <Link to="detail/{id}" ><p className={styles.moveDetail}>
          <DoubleChevronRightIcon/>
          </p>
          </Link>
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
      </div>
    </CSSTransition>
  );
};

export default Modal1;
