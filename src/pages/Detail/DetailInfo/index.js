import React, { useEffect, useState } from "react";
import styles from "./detailInfo.module.scss";
import Button from "../../../components/Common/Button";
import {
  BookmarkIcon,
  HeartIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
  SolidStarIcon,
} from "../../../assets/icon";
import Chart from "../Chart";
import dayjs from "dayjs";
import { deleteMovieLike, getMovie, postMovieLike } from "../../../api/Movies";

const DetailInfo = ({ id }) => {
  const [movieDetail, setMovieDetail] = useState();

  const [isMyState, setMyState] = useState({
    isLiked: false,
    isBookmarked: false,
  });

  const fetchMovieData = async () => {
    const response = await getMovie(id);
    setMovieDetail(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    setMyState({
      isLiked: false,
      isBookmarked: false,
    });
    fetchMovieData();
  }, [id]);

  const setMovieLike = async () => {
    if (isMyState.isLiked) {
      deleteMovieLike(id);
      setMyState({ ...isMyState, isLiked: false });
    }
    if (!isMyState.isLiked) {
      postMovieLike(id);
      setMyState({ ...isMyState, isLiked: true });
    }
  };

  return (
    <>
      <article className={styles.detailInfoWrap}>
        <img src={movieDetail?.postImage} alt="detailInfoBackground" />

        <section className={styles.overlay}>
          <article className={styles.headerContentWrap}>
            <div className={styles.leftWrap}>
              <img src={movieDetail?.postImage} alt="detailPoster" />
              <div className={styles.buttonWrap}>
                <Button option="secondary" className={styles.button}>
                  북마크
                  {isMyState.isBookmarked ? (
                    <SolidBookmarkIcon />
                  ) : (
                    <BookmarkIcon />
                  )}
                </Button>
                <Button
                  option="secondary"
                  className={styles.button}
                  onClick={setMovieLike}
                >
                  좋아요
                  {isMyState.isLiked ? <SolidHeartIcon /> : <HeartIcon />}
                </Button>
              </div>
            </div>
            <div className={styles.rightWrap}>
              <div className={styles.info}>
                <h1>
                  {movieDetail?.title} <p>{movieDetail?.runtime}분</p>
                </h1>
                <h2>
                  <span>
                    {dayjs(movieDetail?.releasedAt + "").format("YYYY.MM.DD")}
                  </span>

                  {movieDetail?.genres.map((genre) => {
                    return <span key={genre.id}> {genre.name} /</span>;
                  })}
                </h2>

                <h3>
                  | 작품정보 |<p>{movieDetail?.plot}</p>
                </h3>

                <h3 className={styles.actors}>
                  | 출연 |
                  <p>
                    {movieDetail?.actors.map((actor) => {
                      return <span key={actor.id}> {actor.name} </span>;
                    })}
                  </p>
                </h3>

                <h3 className={styles.actors}>
                  | 제작 / 스태프 |
                  <p>
                    <span>{movieDetail?.company} / </span>
                    {movieDetail?.staffs.map((staff) => {
                      return <span key={staff.id}> {staff.name} </span>;
                    })}
                  </p>
                </h3>
              </div>
              <div className={styles.chartStarWrap}>
                <Chart className={styles.chartWrap} />
                <div className={styles.starWrap}>
                  <span>평균 평점</span>
                  <SolidStarIcon />
                  {/* {movieDetail?.averageScore?.toFixed(1)} */}
                </div>
              </div>
            </div>
          </article>
        </section>
      </article>
    </>
  );
};

export default DetailInfo;
