import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import {
  getMoviesTop,
  getMoviesGenre,
  getMoviesMeLike,
  getMoviesUserLike,
} from '../../api/Movies';
import { getBookmarksPage, getUserBookmarksPage } from '../../api/Bookmarks';
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SolidHeartIcon,
  SolidBookmarkIcon,
} from '../../assets/icon';
import './carousel.scss';
import styles from './rankingCarousel.module.scss';
import { PosterRanking, PosterCategory } from '../PosterHome';
import { PosterUser } from '../PosterUser';
import MovieModal from '../MovieModal';

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const RankingCarousel = () => {
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

  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dot: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3, //몇개씩 보여줌?,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <>
      {isShow && (
        <MovieModal
          onModalClose={onModalClose}
          onModalClick={onModalClick}
          movieId={movieId}
        />
      )}
      <div className={styles.ranking}>
        <div className={styles.slider}>
          <Slider {...settings}>
            {moviesTop &&
              moviesTop.data.map((movie, idx) => (
                <div
                  key={movie.id}
                  className={
                    idx === slideIndex ? styles.slideActive : styles.slideBefore
                  }
                >
                  <p className={styles.rankingNum}>{idx + 1}</p>
                  <PosterRanking
                    key={movie.id}
                    title={movie.title}
                    id={movie.id}
                    postImage={movie.postImage}
                    onModalClick={onModalClick}
                    movieId={movieId}
                    movie={movie}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
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
          <PosterCategory
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

export const UserCarousel = ({ name }) => {
  const userId = useParams();
  const [myLike, setMyLike] = useState([]);
  const [myMark, setMyMark] = useState();
  const [userLike, setUserLike] = useState([]);
  const [userMark, setUserMark] = useState([]);

  const fetchMoviesLike = async () => {
    const response = await getMoviesMeLike();
    setMyLike(response.data);
  };
  const fetchMoviesMark = async () => {
    const response = await getBookmarksPage(1, 20);
    setMyMark(response.data.data);
  };

  const fetchUserLike = async () => {
    const response = await getMoviesUserLike(userId.id);
    setUserLike(response.data);
  };
  const fetchUserBookmark = async () => {
    const response = await getUserBookmarksPage(userId.id);
    setUserMark(response.data);
  };

  useEffect(() => {
    fetchMoviesLike();
    fetchMoviesMark();
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
      {name === 'myLike' && (
        <div name="myLike">
          <Slider {...settings}>
            {myLike.map((index) => (
              <PosterUser
                type="like"
                key={index.id}
                index={index}
                callback={fetchMoviesLike}
              />
            ))}
          </Slider>
        </div>
      )}

      {name === 'myMark' && (
        <div name="myMark">
          <Slider {...settings}>
            {myMark &&
              myMark?.map((index) => (
                <PosterUser
                  type="mark"
                  key={index.movie}
                  index={index.movie}
                  callback={fetchMoviesMark}
                />
              ))}
          </Slider>
        </div>
      )}

      {name === 'userLike' && (
        <div>
          <Slider {...settings}>
            {userLike.map((index) => (
              <PosterUser
                type="like"
                key={index.id}
                index={index}
                children={<SolidHeartIcon />}
              />
            ))}
          </Slider>
        </div>
      )}

      {name === 'userMark' && (
        <div>
          <Slider {...settings}>
            {userMark.map((index) => (
              <PosterUser
                type="mark"
                key={index.movie}
                index={index.movie}
                children={<SolidBookmarkIcon />}
              />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};
