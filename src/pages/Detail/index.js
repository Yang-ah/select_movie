import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";
import mdata from "../../mock_movie.json";
import Button from "../../components/Common/Button";
import { HeartIcon, SolidBookmarkIcon } from "../../assets/icon";
import Chart from "./Chart";
import { getMoviesTop } from "../../api/Movies";

const Detail = () => {
  const [movies, setMovies] = useState([]);

  const setMovieData = async () => {
    const response = await getMoviesTop();
    console.log({ response });

    if (response.status === 200) {
      //   setMovies(response.data.products);
    }
  };

  useEffect(() => {
    setMovieData();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <img src={mdata[0].postImage} alt="headerBackground" />

        <section className={styles.overlay}>
          <article className={styles.headerContentWrap}>
            <div className={styles.leftWrap}>
              <img src={mdata[0].postImage} alt="headerPoster" />
              <div className={styles.buttonWrap}>
                {/* // TODO: 비어있는 북마크 아이콘 구해오기 => state에 따라 아이콘 변경*/}
                {/* // TODO: mouse event 추가(hover) */}

                <Button
                  option="secondary"
                  className={styles.button}
                  children={
                    <>
                      북마크
                      <SolidBookmarkIcon />
                    </>
                  }
                />
                <Button
                  option="secondary"
                  className={styles.button}
                  children={
                    <>
                      좋아요
                      <HeartIcon />
                    </>
                  }
                />
              </div>
            </div>
            <div className={styles.rightWrap}>
              <div className={styles.info}>
                <h1>
                  {mdata[0].title} <p>{mdata[0].runtime}분</p>
                  <p>100,100명</p>
                </h1>
                <h2>
                  <span>{mdata[0].releaseDate}</span>
                  <span>액션, 스릴러, 공포 </span>
                  <span>한국</span>
                </h2>

                <h3>
                  | 작품정보 |<p>{mdata[0].plot}</p>
                </h3>

                <h3 className={styles.actors}>
                  | 감독 / 출연 |
                  <p>
                    <span>{mdata[0].company}</span>
                    {mdata[0].actors.map((actor) => {
                      return <span key={actor.id}>| {actor.name} |</span>;
                    })}
                  </p>
                </h3>
              </div>
              <div className={styles.chart}>
                <Chart />
              </div>
              <div className={styles.star}>Stars</div>
            </div>
          </article>
        </section>
      </header>
      <h2>accordion</h2>
    </>
  );
};

export default Detail;
