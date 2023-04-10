import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getMoviesGenre } from '../../api/Movies';
import { CaretLeftIcon, CaretRightIcon } from '../../assets/icon';

import './action.module.scss';

import PosterH from '../PosterH';
import MovieModal from '../MovieModal';

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

export const ActionCarousel = () => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenreAction, setMoviesGenreAction] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesGenre = async () => {
    const responseAction = await getMoviesGenre(
      1,
      'fc84777a-d713-4539-a5b9-8c24f0c85b99',
    );
    setMoviesGenreAction(responseAction.data);
  };

  useEffect(() => {
    fetchMoviesGenre();
  }, []);

  const onModalClick = (id) => {
    const num = moviesGenreAction.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesGenreAction.data[num]); //data값에 아이디값 대입
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
        {moviesGenreAction?.data.map((movie) => (
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

export const CrimeCarousel = () => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenreCrime, setMoviesGenreCrime] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesGenre = async () => {
    const responseCrime = await getMoviesGenre(
      1,
      '801c5056-0479-415c-b205-9daecad91b0e',
    );
    setMoviesGenreCrime(responseCrime.data);
  };

  useEffect(() => {
    fetchMoviesGenre();
  }, []);

  const onModalClick = (id) => {
    const num = moviesGenreCrime.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesGenreCrime.data[num]); //data값에 아이디값 대입
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
        {moviesGenreCrime?.data.map((movie) => (
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

export const RomanceCarousel = () => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenreRomance, setMoviesGenreRomance] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesGenre = async () => {
    const responseRomance = await getMoviesGenre(
      1,
      '73fa7e1d-0e3e-4506-9432-21c29faa8dd7',
    );
    setMoviesGenreRomance(responseRomance.data);
  };

  useEffect(() => {
    fetchMoviesGenre();
  }, []);

  const onModalClick = (id) => {
    const num = moviesGenreRomance.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesGenreRomance.data[num]); //data값에 아이디값 대입
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
        {moviesGenreRomance?.data.map((movie) => (
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

export const FamilyCarousel = () => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenreFamily, setmoviesGenreFamily] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesGenre = async () => {
    const responseRomance = await getMoviesGenre(
      1,
      '73fa7e1d-0e3e-4506-9432-21c29faa8dd7',
    );
    setmoviesGenreFamily(responseRomance.data);
  };

  useEffect(() => {
    fetchMoviesGenre();
  }, []);

  const onModalClick = (id) => {
    const num = moviesGenreFamily.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesGenreFamily.data[num]); //data값에 아이디값 대입
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
        {moviesGenreFamily?.data.map((movie) => (
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

//NOTE: 반복되는 코드 정리
export const HomeCarousel = (genreId) => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenreFamily, setmoviesGenreFamily] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);

  const fetchMoviesGenre = async () => {
    const responseRomance = await getMoviesGenre(1, genreId);
    setmoviesGenreFamily(responseRomance.data);
  };

  useEffect(() => {
    fetchMoviesGenre();
  }, []);

  const onModalClick = (id) => {
    const num = moviesGenreFamily.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesGenreFamily.data[num]); //data값에 아이디값 대입
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
        {moviesGenreFamily?.data.map((movie) => (
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

// "7d663bf1-14fe-4320-b409-7d70ddd21560" "드라마"
// "fc84777a-d713-4539-a5b9-8c24f0c85b99" "액션"
// "801c5056-0479-415c-b205-9daecad91b0e" "범죄"
// "079e9098-ff7c-49c7-8d71-fe3fd066aafb" "스릴러"
// "1c9e16ec-920f-4975-b028-b4c681084f88" "가족"
// "360b5842-fc83-4ea9-a7fa-0d62017b975b" "판타지"
// "73fa7e1d-0e3e-4506-9432-21c29faa8dd7" "멜로/로멘스"
// "fb321f3a-0979-4329-8834-aa0f19ff928d" "코메디"
