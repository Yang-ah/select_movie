import React, { useEffect, useRef, useState } from "react";
import styles from "./modal.module.scss";
import Comment from "../Comment";
import dummy from "../../mock_comment.json";
import { Link } from "react-router-dom";

import {
  DoubleChevronRightIcon,
  BookmarkIcon,
  HeartIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
} from "../../assets/icon";
import Button from "../Common/Button";
import dayjs from "dayjs";

const MovieModal = ({ onModalClose ,movieId }) => {

  const [isMyState, setMyState] = useState({
    isLiked: false,
    isBookmarked: false,
  });


  const { title , postImage ,runtime , releasedAt , plot  ,actors , genres , staffs, company} = movieId;

  const modalRef1 = useRef(null);
    
 /* useEffect(() => {
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
  }); */

  //NOTE: tag depth가 조금 깊다~

  return (
      <div className={styles.modal_overlay}>
        <div ref={modalRef1} className={styles.modal}>
          <div className={styles.popup}>
            <img
              className={styles.popupBackground}
              src={postImage}
              alt={title}
            /> 
            <div className={styles.buttonWrap}>
                <Button
                  option="secondary"
                  className={styles.button}
                  children={
                    <>
                      북마크
                      {isMyState.isLiked ? (
                        <SolidBookmarkIcon />
                      ) : (
                        <BookmarkIcon />
                      )}
                    </>
                  }
                />
                <Button
                  option="secondary"
                  className={styles.button}
                  children={
                    <>
                      좋아요
                      {isMyState.isLiked ? <SolidHeartIcon /> : <HeartIcon />}
                    </>
                  }
                />
              </div>
            <div className={styles.popupBody}>
              <div>
                <img
                  className={styles.thumbUrl}
                  src={postImage}
                  alt={title}
                />
              </div>
              <div className={styles.rightWrap}>
              <div className={styles.info}>
                <h1>
                  {title} <p>{runtime}분</p>
                </h1>
                <h2>
                  <span>
                    {dayjs(releasedAt + "").format("YYYY.MM.DD")}
                  </span>

                  {genres.map((genre) => {
                    return <span key={genre.id}> {genre.name} /</span>;
                  })}
                </h2>

                <h3>
                  | 작품정보 |<p>{plot}</p>
                </h3>

                <h3 className={styles.actors}>
                  | 출연 |
                  <p>
                    {actors.map((actor) => {
                      return <span key={actor.id}> {actor.name} </span>;
                    })}
                  </p>
                </h3>

                <h3 className={styles.actors}>
                  | 제작 / 스태프 |
                  <p>
                    <span>{company} / </span>
                    {staffs.map((staff) => {
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
  );
};

export default MovieModal;
