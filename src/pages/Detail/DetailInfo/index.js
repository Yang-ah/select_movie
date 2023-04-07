import React, { useEffect, useState } from 'react';
import styles from './detailInfo.module.scss';
import Button from '../../../components/Common/Button';
import Chart from '../Chart';
import dayjs from 'dayjs';
import { deleteMovieLike, getMovie, postMovieLike } from '../../../api/Movies';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../../atom';
import {
  BookmarkIcon,
  HeartIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
  SolidStarIcon,
} from '../../../assets/icon';
import {
  postBookmark,
  deleteBookmark,
  getMyBookmarks,
} from '../../../api/Boorkmarks';

const DetailInfo = ({ id }) => {
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
      isLiked ? await deleteMovieLike(id) : await postMovieLike(id);
      setIsLiked((cur) => !cur);
    }

    if (name === 'isBookmarked') {
      isBookmarked ? await deleteBookmark(id) : await postBookmark(id);
      setIsBookmarked((cur) => !cur);
    }
  };

  useEffect(() => {
    fetchMovieData();
    fetchBookmarks();
  }, [id]);

  return (
    <>
      <article className={styles.detailInfoWrap}>
        <img src={movieDetail?.postImage} alt="detailInfoBackground" />

        <section className={styles.overlay}>
          <article className={styles.headerContentWrap}>
            <div className={styles.leftWrap}>
              <img src={movieDetail?.postImage} alt="detailPoster" />
              <div className={styles.buttonWrap}>
                <Button
                  name="isBookmarked"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  {isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
                  북마크
                </Button>
                <Button
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
                <span className={styles.title}>{movieDetail?.title}</span>
                <span className={styles.runtime}>
                  {movieDetail?.runtime}분 |
                </span>
                <span>
                  {dayjs(movieDetail?.releasedAt).format('YYYY.MM.DD')}
                </span>
              </header>
              <section className={styles.info}>
                <article>
                  <h3>장르</h3>
                  <p>
                    {movieDetail?.genres.map((genre) => {
                      return <span key={genre.id}>{genre.name}</span>;
                    })}
                  </p>
                </article>
                <article>
                  <h3>줄거리</h3>
                  <p className={styles.plot}>{movieDetail?.plot}</p>
                </article>
                <article>
                  <h3>출연</h3>
                  <p>
                    {movieDetail?.actors.map((actor) => {
                      return <span key={actor.id}> {actor.name} </span>;
                    })}
                  </p>
                </article>
                <article>
                  <h3>제작 / 스태프</h3>
                  <p className={styles.staffs}>
                    <span> {movieDetail?.company} | </span>
                    {movieDetail?.staffs.map((staff) => {
                      return <span key={staff.id}>{staff.name}</span>;
                    })}
                  </p>
                </article>
              </section>

              <section className={styles.chartStarWrap}>
                <Chart className={styles.chartWrap} />
                <div className={styles.starWrap}>
                  <span>평균 평점</span>
                  <SolidStarIcon />
                  {movieDetail?.averageScore?.toFixed(1)}
                </div>
              </section>
            </div>
          </article>
        </section>
      </article>
    </>
  );
};

export default DetailInfo;
