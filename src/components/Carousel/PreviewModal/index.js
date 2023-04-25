import React, { useEffect, useRef, useState } from 'react';
import {
  BookmarkIcon,
  HeartIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
  SolidStarIcon,
  DoubleChevronRightIcon,
} from '../../../assets/icon';
import {
  postBookmark,
  deleteBookmark,
  getMyBookmarks,
} from '../../../api/Bookmarks';
import { deleteMovieLike, getMovie, postMovieLike } from '../../../api/Movies';
import { motion, AnimatePresence } from 'framer-motion';
import { getReviewsMovie } from '../../../api/Reviews';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { isLoginAtom } from '../../../state';
import { Preview } from '../../Comment';
import Button from '../../Common/Button';
import styles from './previewModal.module.scss';
import dayjs from 'dayjs';

const PreviewModal = ({ onModalClose, movieId }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const modalRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    title,
    postImage,
    runtime,
    releasedAt,
    plot,
    actors,
    genres,
    staffs,
    company,
  } = movieId;

  const setUserName = (user) => {
    return user.nickName ?? user.name ?? '닉네임없음';
  };

  const fetchReviews = async () => {
    const response = await getReviewsMovie(movieId.id);
    setReviews(response.data);
  };

  const fetchMovieData = async () => {
    const response = await getMovie(movieId.id);

    if (isLogin) {
      setIsLiked(response.data.isLiked);
    } else {
      setIsLiked(false);
    }
  };

  const fetchBookmarks = async () => {
    const response = await getMyBookmarks();
    const bookmarkIdArr = response.data.map((dataArr) => {
      return dataArr.movie.id;
    });

    if (isLogin && bookmarkIdArr.includes(movieId.id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  const onClickButton = async (e) => {
    if (!isLogin) {
      return alert('로그인 후 이용 가능합니다!');
    }
    const { name } = e.currentTarget;

    if (name === 'isLiked') {
      isLiked
        ? await deleteMovieLike(movieId.id)
        : await postMovieLike(movieId.id);
      setIsLiked((cur) => !cur);
    }

    if (name === 'isBookmarked') {
      isBookmarked
        ? await deleteBookmark(movieId.id)
        : await postBookmark(movieId.id);
      setIsBookmarked((cur) => !cur);
    }
  };

    const backdropVariants = {
      visible: { opacity: 1, scale: 1 },
      hidden: { opacity: 0, scale: 0.3, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    };
    const modalVariants = {
      hidden: {
        y: 150,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', delayduration: 0.5, bounce: 0.4 },
      },
      leaving: {
        opacity: 0,
        position: "fixed",
        top: "-100vh",
        left: "50%",
        transform: "translate(-50%, 0) scale(0.8)",
        transition: {
          duration: 0.2,
        },
      },
    };


  useEffect((onModalClose) => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onModalClose = { onModalClose };
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  });

  useEffect(() => {
    fetchMovieData();
    fetchBookmarks();
    fetchReviews();
  }, [movieId.id]);


  return (
        <div ref={modalRef} className={styles.modal} onClick={onModalClose}>
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
              >
                <div className={styles.headerContentWrap}>
                  <div className={styles.leftWrap}>
                    <img
                      className={styles.thumbUrl}
                      src={postImage}
                      alt="detailPoster"
                    />
                    <div className={styles.buttonWrap}>
                      <Button
                        name="isBookmarked"
                        option="secondary"
                        className={styles.button}
                        onClick={onClickButton}
                      >
                        {isBookmarked ? (
                          <SolidBookmarkIcon />
                        ) : (
                          <BookmarkIcon />
                        )}
                        북마크
                      </Button>
                      <Button
                        option="secondary"
                        name="isLiked"
                        className={styles.button}
                        onClick={onClickButton}
                      >
                        {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
                        좋아요
                      </Button>
                    </div>
                  </div>
                  <div className={styles.rightWrap}>
                    <header>
                      <span className={styles.title}>{title}</span>
                      <span className={styles.runtime}>{runtime}분 |</span>
                      <span>{dayjs(releasedAt).format('YYYY.MM.DD')}</span>
                    </header>
                    <section className={styles.info}>
                      <article>
                        <h3>장르</h3>
                        <p className={styles.genres}>
                          {genres.map((genre) => {
                            return <span key={genre.id}>{genre.name}</span>;
                          })}
                        </p>
                      </article>
                      <article>
                        <h3>줄거리</h3>
                        <p className={styles.plot}>{plot}</p>
                      </article>
                      <article>
                        <h3>출연</h3>
                        <p className={styles.staffs}>
                          {actors.map((actor) => {
                            return <span key={actor.id}> {actor.name} </span>;
                          })}
                        </p>
                      </article>
                      <article>
                        <h3>제작 / 스태프</h3>
                        <p className={styles.staffs}>
                          <span> {company} | </span>
                          {staffs.map((staff) => {
                            return <span key={staff.id}>{staff.name}</span>;
                          })}
                        </p>
                      </article>
                    </section>
                  </div>
                </div>
              </motion.div>
              <p className={styles.close} onClick={onModalClose}>
                x
              </p>
              <div className={styles.moveSection}>
                <div
                  className={styles.moveDetail}
                  onClick={() => {
                    navigate(`/detail/${movieId.id}`, {
                      to: true,
                    });
                  }}
                >
                  <DoubleChevronRightIcon />
                </div>
              </div>
              {reviews?.slice(0, 2).map((review, index) => {
                return (
                  <Preview
                    key={index + review.user.id}
                    userName={setUserName(review.user)}
                    date={dayjs(review.createdAt).format('YYYY.MM.DD')}
                    comment={review.content}
                    rating={review.score}
                  />
                );
              })}
              <div className={styles.starBox}>
                <p className={styles.starTitle}>평균평점</p>
                <p className={styles.starNum}>
                  <SolidStarIcon className={styles.star} />
                  {movieId?.averageScore?.toFixed(1)}
                </p>
              </div>
            </div>

            {movieId?.averageScore}
        </div>
  );
};

export default PreviewModal;
