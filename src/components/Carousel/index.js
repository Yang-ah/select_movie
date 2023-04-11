import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import {
  getMoviesGenre,
  getMoviesMeLike,
  getBookmarksMe,
  postMovieLike,
  deleteMovieLike,
} from '../../api/Movies';

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

import styles from './myCarousel.module.scss';
import './carousel.scss';

import { PosterHeart, PosterM, PosterMark } from '../PosterM';
import PosterH from '../PosterH';
import MovieModal from '../MovieModal';
import { getBookmarksPage } from '../../api/Bookmarks';

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const HomeCarousel = ({ GenreId }) => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenre, setMoviesGenre] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesGenre = async () => {
    const responseAction = await getMoviesGenre(1, GenreId);
    setMoviesGenre(responseAction.data);
  };

  useEffect(() => {
    fetchMoviesGenre();
  }, []);

  const onModalClick = (id) => {
    const num = moviesGenre.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesGenre.data[num]); //data값에 아이디값 대입
  };

  const onModalClose = () => {
    setIsShow(false);
  };

  const settings = {
    dot: false,
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
        {moviesGenre?.data.map((movie) => (
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

export const MyCarousel = () => {
  const navigate = useNavigate;
  const [moviesLike, setMoviesLike] = useState();
  const [moviesMark, setMoviesMark] = useState();
  //NOTE: 에러 발생 중
  const [cancelLike, setCancelLike] = useState(false);
  const [cancelBookmark, setCancelBookmark] = useState(false);

  const fetchMoviesLike = async () => {
    const response = await getMoviesMeLike();
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
  }, []);

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
