import React, { useState } from "react";
import styles from "./mypage.module.scss";
import mdata from "../../mock_movie.json";
import Info from "./InfoBox";
import { MyCarousel } from "../../components/Carousel";
import Comment from "./CommentBox";
import MovieModal from "../../components/MovieModal";

const MyPage = () => {
  const [movies] = useState(mdata);
  const [movieInfo, setMovieInfo] = useState(movies[0]);
  const [isShow, setIsShow] = useState(false);

  const onOver = (id) => {
    const num = movies.findIndex((item) => item.id === id);
    setMovieInfo(movies[num]);
  };

  const onModalClick = () => {
    setIsShow(true);
  };
  const onModalClose = () => {
    setIsShow(false);
  };
  return (
    <section className={styles.wrap}>
      <Info />
      <div className={styles.contentbox}>
        <p>내가 좋아하는 컨텐츠</p>
        <MyCarousel
          movieInfo={movieInfo}
          movies={movies}
          onModalClick={onModalClick}
          onOver={onOver}
        />
        <MovieModal
          setIsShow={setIsShow}
          isShow={isShow}
          onModalClose={onModalClose}
          movieInfo={movieInfo}
        ></MovieModal>
      </div>
      <div className={styles.commentbox}>
        <p>작성한 리뷰 및 댓글</p>
        <Comment />
      </div>
    </section>
  );
};

export default MyPage;
