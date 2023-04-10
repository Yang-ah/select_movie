import React, { useEffect, useRef, useState } from "react";
import styles from "./modal.module.scss";
import { useNavigate } from "react-router-dom";
import { motion ,AnimatePresence  } from "framer-motion";
import { deleteMovieLike, getMovie, postMovieLike } from '../../api/Movies';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../atom';

import {
  BookmarkIcon,
  HeartIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
  SolidStarIcon,
  DoubleChevronRightIcon
} from "../../assets/icon";
import {
  postBookmark,
  deleteBookmark,
  getMyBookmarks,
} from '../../api/Boorkmarks';

import Button from "../Common/Button";
import dayjs from "dayjs";

import { Preview } from "../Comment"
import { getReviewsMovie } from "../../api/Reviews";



const MovieModal = ({ onModalClose ,movieId }) => {

  //북마크 관련내용

  const isLogin = useRecoilValue(isLoginAtom);
  const [movieDetail, setMovieDetail] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchMovieData = async () => {
    const response = await getMovie(id);
    setMovieDetail(response.data);

    if (isLogin) {
      setIsLiked(response.data.isLiked);
    } else {
      setIsLiked(false);
    }
    // console.log('like', isLogin && response.data.isLiked);
  };

  const fetchBookmarks = async () => {
    const response = await getMyBookmarks();
    const bookmarkIdArr = response.data.map((dataArr) => {
      return dataArr.movie.id;
    });

    if (isLogin && bookmarkIdArr.includes(id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }

    //  console.log('bookmark', isLogin && bookmarkIdArr.includes(id));
  };

  const onClickButton = async (e) => {
    if (!isLogin) {
      return alert('로그인 후 이용 가능합니다!');
    }
    const { name } = e.currentTarget;

    if (name === 'isLiked') {
      isLiked ? await deleteMovieLike(movieId.id) : await postMovieLike(movieId.id);
      setIsLiked((cur) => !cur);
    }

    if (name === 'isBookmarked') {
      isBookmarked ? await deleteBookmark(movieId.id) : await postBookmark(movieId.id);
      setIsBookmarked((cur) => !cur);
    }
  };



  //리뷰관련 내용 

  const [ reviews , setReviews ] = useState();

  const fetchReviews = async () => {

    const response = await getReviewsMovie(movieId.id);
    //  console.log(response.data);
    setReviews(response.data);
    console.log(response.data)
   
  };
  console.log(movieId.id)
  useEffect(() => {
    fetchReviews();
  }, [movieId.id]);

  const setUserName = (user) => {
    return user.nickName ?? user.name ?? '닉네임없음';
  };

  //ㅇ
  
  const backdropVariants = {
    visible: { opacity: 1,
      scale : 1,
     },
    hidden: { opacity: 0 ,
      scale : 0.3,
      backgroundColor: "rgba(0, 0, 0, 0.5)" ,
    },

  };
  const modalVariants = {
    hidden: {
      y : 150 ,
      opacity: 0,
    },
    visible: {
      y : 0 ,
      opacity: 1,
      transition: { type: "spring", delayduration : 0.5 , bounce: 0.4,}
    },
  };

  const closeVariants = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
    visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
    
  }
  const navigate = useNavigate();
  const [isMyState, setMyState] = useState({
    isLiked: false,
    isBookmarked: false,
  });


  const { title , postImage ,runtime , releasedAt , plot  ,actors , genres , staffs, company} = movieId;
``
  const modalRef1 = useRef(null);
    
  useEffect((onModalClose) => {
    
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef1.current && !modalRef1.current.contains(event.target)) {
        onModalClose={onModalClose}
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  }); 

  //NOTE: tag depth가 조금 깊다~

  return (

   <AnimatePresence
   initial="hidden"
   animate="visible"
   exit="exit"
   >
      <div className={styles.modal_overlay}>
        <div ref={modalRef1} className={styles.modal}>
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="modal" 
        >
          <div className={styles.popup}>
            <img
              className={styles.popupBackground}
              src={postImage}
              alt={title}
            /> 
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="modal" 
        >
            <div className={styles.headerContentWrap}>
            <div className={styles.leftWrap}>
              <img className={styles.thumbUrl} src={postImage} alt="detailPoster" />
              <div className={styles.buttonWrap}>
                <Button
                  name="isBookmarked"
                  option="secondary"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  북마크
                  {isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
                </Button>
                <Button
                  option="secondary"
                  name="isLiked"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  좋아요
                  {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
                </Button>
              </div>
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
          </motion.div>        
            <p className={styles.close} onClick={onModalClose}>
              x
            </p>
            <div className={styles.moveSection}>
          <div className={styles.moveDetail}
            onClick={() => {
            navigate(`/detail/${movieId.id}`, {
              to: true,
            });
         }}>
          <DoubleChevronRightIcon/>
          </div>
          </div>
          <div className={styles.moveReview}>
          {reviews &&
          reviews.slice(0, 2).map((review)=>{
            return(
              <Preview 
              userName={setUserName(review.user)}
              date={dayjs(review.createdAt).format('YYYY.MM.DD')}
              comment={review.content}
              rating={review.score}
              />
              )
          })}
          </div>
          </div>
          
          {movieId.averageScore} 
          </motion.div>
        </div>
      </div>
      </AnimatePresence>
  );
};


export default MovieModal;

//  {movieId.averageScore} 평균평점