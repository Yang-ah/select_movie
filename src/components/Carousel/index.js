import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import {
  getMoviesTop,
  getMovies,
  getMoviesMeLike,
  getBookmarksMe,
} from '../../api/Movies';
import { getBookmarksPage } from '../../api/Boorkmarks';
import { getReviewsMe } from '../../api/Reviews';
import { useNavigate } from 'react-router-dom';
import './carousel.scss';
import styles from './myCarousel.module.scss';
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SolidHeartIcon,
  SolidBookmarkIcon,
  ModifyIcon,
  TrashIcon,
  SolidStarIcon,
} from '../../assets/icon';

import PosterH from '../PosterH';
import { PosterHeart, PosterMark } from '../PosterM';
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
    arrows: false,
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

export const MyCarousel = () => {
  const [moviesLike, setMoviesLike] = useState();
  const [moviesMark, setMoviesMark] = useState([]);

  const fetchMoviesLike = async () => {
    const response = await getMoviesMeLike();
    setMoviesLike(response.data);
    console.log(response.data);
  };
  const fetchMoviesMark = async () => {
    const response = await getBookmarksPage(1, 20);
    setMoviesMark(response.data.data);
    console.log(response.data.data);
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
    slidesToScroll: 4,
    prevArrow: <ChevronLeftIcon />,
    nextArrow: <ChevronRightIcon />,
  };

  return (
    <>
      <p>
        <SolidHeartIcon className={styles.myIcon} />
        내가 좋아하는 컨텐츠
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesLike &&
            moviesLike?.map((index) => (
              <div className={styles.wrapper}>
                <div className={styles.screen}>
                  <article className={styles.layerUp}>
                    <div className={styles.title}>{index.title}</div>
                    <button className={styles.icon}>
                      {moviesLike ? <SolidHeartIcon /> : <HeartIcon />}
                    </button>
                  </article>
                  <Link to={`/detail/${index.id}`}>
                    <article className={styles.layerDown}>
                      <img
                        className={styles.postImage}
                        src={index.postImage}
                        alt={index.title}
                      />
                    </article>
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <p>
        <SolidBookmarkIcon className={styles.myIcon} />
        내가 북마크 한 컨텐츠
      </p>
      <div className={styles.mywrap}>
        <Slider {...settings}>
          {moviesMark &&
            moviesMark?.map((index) => (
              <div className={styles.wrapper}>
                <div className={styles.screen}>
                  <article className={styles.layerUp}>
                    <div className={styles.title}>{index.movie.title}</div>
                    <button className={styles.icon}>
                      {moviesMark ? <SolidHeartIcon /> : <HeartIcon />}
                    </button>
                  </article>
                  <Link to={`/detail/${index.movie.id}`}>
                    <article className={styles.layerDown}>
                      <img
                        className={styles.postImage}
                        src={index.movie.postImage}
                        alt={index.movie.title}
                      />
                    </article>
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);

  const fetchMyReviews = async () => {
    const response = await getReviewsMe(1, 20);
    setReviews(response.data.data);
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const settings = {
    rows: 2,
    swipe: true,
    swipeToScroll: false,
    dots: true,
    dotsClass: 'slick-dots',
    arrows: false,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,
    appendDots: (dots) => <ul> {dots} </ul>,
    customPaging: (i) => <div>{i + 1}</div>,
  };

  return (
    <>
      <p>
        <ModifyIcon className={styles.myIcon} />
        내가 작성한 리뷰
      </p>
      <section className={styles.wrapR}>
        <Slider {...settings}>
          {reviews.map((item, index) => {
            return (
              <div>
                <div className={styles.wrapperR}>
                  <section className={styles.screenR}>
                    <article className={styles.layerUpR}>
                      <button className={styles.fixModalR}>
                        <ModifyIcon className={styles.iconR} />
                      </button>
                      <button className={styles.deleteModalR}>
                        <TrashIcon className={styles.iconR} />
                      </button>
                    </article>

                    <article className={styles.layerDownR}>
                      <aside className={styles.topR}>
                        <div className={styles.leftR}>
                          <p className={styles.titleR}>
                            id:{reviews[index].id}
                          </p>
                          <p className={styles.titleR}>
                            title:{reviews[index].titleR}
                          </p>
                          <p className={styles.createAtR}>
                            createAt:{reviews[index].createAtR}
                          </p>
                        </div>
                        <div className={styles.scoreR}>
                          <SolidStarIcon className={styles.starR} />
                          {reviews[index].score}
                        </div>
                      </aside>
                      <p className={styles.contentR}>
                        {reviews[index].content.length > 200
                          ? reviews[index].content.substring(0, 200) + '...'
                          : reviews[index].content}
                      </p>
                    </article>
                  </section>
                </div>
              </div>
            );
          })}
        </Slider>
      </section>
    </>
  );
};
