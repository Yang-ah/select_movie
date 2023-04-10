import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../atom';
import './carousel.scss';
import styles from './my.module.scss';
import {
  getMoviesTop,
  getMovies,
  getMoviesMeLike,
  postMovieLike,
  deleteMovieLike,
} from '../../api/Movies';
import { getBookmarksPage } from '../../api/Bookmarks';
import { getReviewsMe } from '../../api/Reviews';



import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  SolidHeartIcon,
  BookmarkIcon,
  SolidBookmarkIcon,
} from '../../assets/icon';

import PosterH from '../PosterH';
import { PosterM } from '../PosterM';
import MovieModal from '../MovieModal';

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const HomeCarousel = () => {
  // 모달 관련 변수
  const navigate = useNavigate;
  const [isShow, setIsShow] = useState(false);
  const [moviesTop, setMoviesTop] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesTop = async () => {
    const response = await getMoviesTop();
    setMoviesTop(response.data);
  };

  useEffect(() => {
    fetchMoviesTop();
  }, []);

  const onModalClick = (id) => {
    const num = moviesTop.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesTop.data[num]); //data값에 아이디값 대입
  };

  const onModalClose = () => {
    setIsShow(false);
  };
  const settings = {
    dots: false,
    arrow: false,
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 5,
    prevArrow: <CaretLeftIcon />,
    nextArrow: <CaretRightIcon />,
  };

  return (
    <div>
      {isShow && (
        <MovieModal
          onModalClose={onModalClose}
          onModalClick={onModalClick}
          movieId={movieId}
        />
      )}
      <Slider {...settings}>
        {moviesTop?.data.map((movie) => (
          <PosterH
            key={movie.id}
            title={movie.title}
            id={movie.id}
            postImage={movie.postImage}
            onModalClick={onModalClick}
            movieId={movieId}
          />
        ))}
      </Slider>
    </div>
  );
};

export const MyCarousel = ({ id, name }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const [moviesLike, setMoviesLike] = useState(); //좋아요 목록
  const [moviesMark, setMoviesMark] = useState([]); //북마크 목록
  const [cancelLike, setCancelLike] = useState(false); //좋아요 취소
  const [cancelBookmark, setCancelBookmark] = useState(false); //북마크 취소

  //좋아요 목록
  const fetchMoviesLike = async () => {
    const response = await getMoviesMeLike(id);
    setMoviesLike(response.data);
    console.log('좋아요 리스트', response.data);
    setCancelLike(response.data.isLike);
    console.log('좋아요 여부', response.data.isLike);
  };
  //북마크 목록
  const fetchMoviesMark = async () => {
    const response = await getBookmarksPage(1, 20);
    setMoviesMark(response.data.data);
    console.log('북마크 리스트', response.data.data);
  };

  //좋아요 취소
  const onClick = async (e) => {
    const { name } = e.currentTarget;

    if (name === 'cancelLike') {
      cancelLike ? await postMovieLike(id) : await deleteMovieLike(id);
      setCancelLike((cur) => !cur);
      await fetchMoviesLike();
      //console.log('좋아요 취소');
    }
  };

  useEffect(() => {
    fetchMoviesLike();
    fetchMoviesMark();
  }, [id]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 5,
    prevArrow: <ChevronLeftIcon />,
    nextArrow: <ChevronRightIcon />,
  };

  return (
    <>
      <p className={styles.category}>
        <SolidHeartIcon className={styles.categoryIcon} />
        내가 좋아하는 컨텐츠
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesLike &&
            moviesLike?.map((index) => (
              <PosterM
                className={styles.like}
                name="cancelLike"
                id={index.id}
                title={index.title}
                postImage={index.postImage}
                children={
                  cancelLike ? (
                    <HeartIcon className={styles.icon} />
                  ) : (
                    <SolidHeartIcon className={styles.icon} />
                  )
                }
                onClick={onClick}
              >
                {cancelLike ? (
                  <HeartIcon className={styles.icon} />
                ) : (
                  <SolidHeartIcon className={styles.icon} />
                )}
              </PosterM>
            ))}
        </Slider>
      </div>

      <p className={styles.category}>
        <SolidBookmarkIcon className={styles.categoryIcon} />
        내가 북마크 한 컨텐츠
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesMark &&
            moviesMark?.map((index) => (
              <PosterM
                className={styles.bookMark}
                id={index.movie.id}
                title={index.movie.title}
                postImage={index.movie.postImage}
                children={
                  cancelBookmark ? (
                    <BookmarkIcon className={styles.icon} />
                  ) : (
                    <SolidBookmarkIcon className={styles.icon} />
                  )
                }
                onClick={onClick}
              />
            ))}
        </Slider>
      </div>
    </>
  );
};
