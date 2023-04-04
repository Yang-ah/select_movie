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
import {
  deleteBookmark,
  deleteMovieLike,
  getMovie,
  postBookmark,
  postMovieLike,
} from "../../../api/Movies";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../../atom";

const DetailInfo = ({ id }) => {
  const isLogin = useRecoilValue(isLoginAtom);

  const [movieDetail, setMovieDetail] = useState();
  const [isMyState, setMyState] = useState({
    isLiked: false,
    isBookmarked: false,
  });

  const fetchMovieData = async () => {
    const response = await getMovie(id);
    setMovieDetail(response.data);

    // TODO : bookmark도 데이터에 넣어주실 수 있는지 여쭤보기 !
    if (isLogin) {
      setMyState({
        isLiked: response.data.isLiked,
        isBookmarked: false,
      });
    }

    if (!isLogin) {
      setMyState({
        isLiked: false,
        isBookmarked: false,
      });
    }
  };

  // 다른 영화로 이동했을 때, state 초기화하고 다시 fetch
  useEffect(() => {
    setMyState({
      isLiked: false,
      isBookmarked: false,
    });
    fetchMovieData();
  }, [id]);

  const onClickButton = (e) => {
    if (!isLogin) {
      return alert("로그인 후 이용 가능합니다!");
    }

    const { name } = e.currentTarget;

    if (isMyState[name]) {
      name === "isLiked" && deleteMovieLike(id);
      name === "isBookmarked" && deleteBookmark(id);

      setMyState({ ...isMyState, [name]: false });
    }

    if (!isMyState[name]) {
      name === "isLiked" && postMovieLike(id);
      name === "isBookmarked" && postBookmark(id);
      setMyState({ ...isMyState, [name]: true });
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
                <Button
                  name="isBookmarked"
                  option="secondary"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  북마크
                  {isMyState.isBookmarked ? (
                    <SolidBookmarkIcon />
                  ) : (
                    <BookmarkIcon />
                  )}
                </Button>
                <Button
                  option="secondary"
                  name="isLiked"
                  className={styles.button}
                  onClick={onClickButton}
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
                    {dayjs(movieDetail?.releasedAt).format("YYYY.MM.DD")}
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
