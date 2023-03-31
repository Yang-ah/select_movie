import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";
import FakeAccordion from "./Accordion/FakeAccordian";
import DetailInfo from "./DetailInfo";
import Dropdown from "../../components/Common/Dropdown";
import Comment from "../../components/Comment";
import { getMoviesRelated } from "../../api/Movies";
import RelatedCard from "./RelatedCard";
import { getReviewsMovie } from "../../api/Reviews";
import { getUsersMe } from "../../api/Users";
import { Link, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  // TODO: DetailInfo {id}로 변경하기, DetailInfo 시멘틱 넣기
  // TODO: CommentInput "닉네임", 등록 api 연결하기 !
  // TODO: Dropdown 정렬 글씨 줄이기, 애니메이션 추가(화살표 돌아가게), border?,
  // TODO : 리뷰 api 받아서, 리뷰에 댓글이 있다면 Accordion, 없다면 comment 받기
  // TODO : 정렬(별점순, 댓글 많은 순), comment 가 없다면 ? "첫 리뷰를 남겨보세용"

  const { id } = useParams();

  const navigate = useNavigate();
  /*
  const [{ movieId, setMovieId }] = useState();
  useEffect(() => {
    setMovieId(id);
    console.log(movieId);
  }, [{ id }]);
  */

  const [relatedMovies, setRelatedMovies] = useState();

  const fetchRelatedMovies = async () => {
    const response = await getMoviesRelated(id);
    setRelatedMovies(response.data);

    /* const reviewTest = await getReviewsMovie(
      "0151449f-d2ae-4753-a44c-79be9044f8ff"
    );
    console.log(reviewTest.data); */
  };

  useEffect(
    () => {
      fetchRelatedMovies();
    },
    [id],
    { id }
  );

  return (
    <>
      <DetailInfo id={id} />
      <section className={styles.sectionWrap}>
        <main className={styles.commentsWrap}>
          <Comment
            type="commentInput"
            className={styles.commentInput}
            userName="닉네임"
          />
          <header>
            <h1>Comments</h1>
            <Dropdown
              items={["별점높은순", "별점낮은순", "공감많은순"]}
              className={styles.dropdown}
            />
          </header>

          <main>
            <FakeAccordion />
            <Comment
              type="comment"
              comment="라라라랄ㄹ라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라ㅏㅏ"
              userName="라라랄"
              rating="4.5"
              className={styles.test}
            />
            <FakeAccordion />
            <Comment
              type="comment"
              comment="라라라랄ㄹ라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라라라랄ㄹ라라라라라ㅏㅏ"
              userName="라라랄"
              rating="4.5"
              className={styles.test}
            />
          </main>
        </main>
        <aside className={styles.relatedWrap}>
          <h3>영화가 마음에 드셨다면 👀</h3>

          {relatedMovies &&
            relatedMovies.map((movie) => {
              return (
                <RelatedCard
                  key={movie.id}
                  title={movie.title}
                  id={movie.id}
                  postImage={movie.postImage}
                  onClick={() => {
                    navigate(`/detail/${movie.id}`);
                  }}
                />
              );
            })}
        </aside>
      </section>
    </>
  );
};

export default Detail;
