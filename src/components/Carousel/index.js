import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useRecoilValue } from 'recoil';
import useMe from '../../hooks/useMe';
import { isLoginAtom } from '../../atom';

import {
  getMoviesGenre,
  getMoviesMeLike,
  getMoviesUserLike,
} from '../../api/Movies';
import {
  getMyBookmarks,
  getBookmarksPage,
  getUserBookmarksPage,
} from '../../api/Bookmarks';

import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../assets/icon';

import styles from './myCarousel.module.scss';
import './carousel.scss';

import { PosterH } from '../PosterH';
import { PosterM, PosterHeart, PosterBookmark } from '../PosterM';
import { PosterU } from '../PosterU';
import MovieModal from '../MovieModal';

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
    console.log(moviesGenre.data[num]);
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
            movie={movie}
            onModalClick={onModalClick}
            movieId={movieId}
            callback={fetchMoviesGenre}
          />
        ))}
      </Slider>
    </div>
  );
};

export const MyCarousel = () => {
  const [moviesLike, setMoviesLike] = useState([]);
  const [moviesMark, setMoviesMark] = useState();

  const fetchMoviesLike = async () => {
    const response = await getMoviesMeLike();
    setMoviesLike(response.data);
  };
  const fetchMoviesMark = async () => {
    const response = await getBookmarksPage(1, 20);
    setMoviesMark(response.data.data);
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
        <span className={styles.text}>좋아하는 컨텐츠</span>
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesLike.map((index) => (
            <PosterHeart
              key={index.id}
              index={index}
              callback={fetchMoviesLike}
            />
          ))}
        </Slider>
      </div>
      <p className={styles.category}>
        <span className={styles.text}>북마크 한 컨텐츠</span>
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesMark &&
            moviesMark?.map((index) => (
              <PosterBookmark index={index.movie} callback={fetchMoviesMark} />
            ))}
        </Slider>
      </div>
    </>
  );
};

export const UserCarousel = () => {
  const userId = useParams();
  const [moviesLike, setMoviesLike] = useState([]);
  const [moviesMark, setMoviesMark] = useState([]);

  const fetchUserLike = async () => {
    const response = await getMoviesUserLike(userId.id);
    setMoviesLike(response.data);
  };
  const fetchUserBookmark = async () => {
    const response = await getUserBookmarksPage(userId.id);
    setMoviesMark(response.data);
  };

  useEffect(() => {
    fetchUserLike();
    fetchUserBookmark();
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
        <span className={styles.text}>좋아하는 컨텐츠</span>
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesLike.map((index) => (
            <PosterU key={index.id} index={index} />
          ))}
        </Slider>
      </div>

      <p className={styles.category}>
        <span className={styles.text}>북마크 한 컨텐츠</span>
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesMark.map((index) => (
            <PosterBookmark className={styles.bookMark} index={index.movie} />
          ))}
        </Slider>
      </div>
    </>
  );
};
