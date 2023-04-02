import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";
import DetailInfo from "./DetailInfo";
import Dropdown from "../../components/Common/Dropdown";
import Comment from "../../components/Comment";
import { getMoviesRelated } from "../../api/Movies";
import RelatedCard from "./RelatedCard";
import { getReviewsMovie } from "../../api/Reviews";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atom";
import useMe from "../../hooks/useMe";
import Accordion from "./Accordion";

const Detail = () => {
  // TODO:  DetailInfo 시멘틱 넣기
  // TODO : 정렬(별점순, 댓글 많은 순), comment 가 없다면 ? "첫 리뷰를 남겨보세용"

  const navigate = useNavigate();
  const { id } = useParams();
  const isLogin = useRecoilValue(isLoginAtom);
  const me = useMe();
  const [relatedMovies, setRelatedMovies] = useState();
  const [reviews, setReviews] = useState([]); // review 객체가 들어있는 배열
  const [newReview, setNewReview] = useState({
    content: "string",
    score: 0,
  });

  const fetchRelatedMovies = async () => {
    const response = await getMoviesRelated(id);
    setRelatedMovies(response.data);
  };

  //"0151449f-d2ae-4753-a44c-79be9044f8ff"
  const fetchReviews = async () => {
    const response = await getReviewsMovie(id);
    setReviews(response.data);
  };

  const onClick = () => {
    const newReviewObject = {
      ...newReview,
      id: reviews.length + 1,
      createdAt: new Date(),
      score: 3,
      user: {
        name: me && me.name,
        nickname: me && me.nickname,
      },
    };

    const tmpReviews = [newReviewObject, ...reviews];
    setReviews(tmpReviews);
  };

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
    setNewReview({
      ...newReview,
      [name]: value,
    });
    console.log(name, value);
  };

  useEffect(() => {
    fetchRelatedMovies();
    fetchReviews();
  }, [id, reviews]);

  return (
    <>
      <DetailInfo id={id} />
      <section className={styles.sectionWrap}>
        <main className={styles.mainWrap}>
          <Comment
            userName={
              me && isLogin
                ? me["nickname"] ?? me["name"]
                : "로그인 후 작성가능"
            }
            type="reviewInput"
            className={styles.reviewInput}
            disabled={!isLogin}
            placeholder={isLogin ? "" : "로그인 후 작성하실 수 있습니다."}
            onClick={onClick}
            onChange={onChange}
          />
          <header>
            <h1>Reviews</h1>
            <Dropdown
              items={["별점높은순", "별점낮은순", "공감많은순"]}
              className={styles.dropdown}
            />
          </header>

          <article className={styles.reviewsWrap}>
            {reviews.length !== 0 || (
              <div className={styles.empty}>
                <p>텅</p>
                <p>첫 리뷰를 남겨보세요✨</p>
              </div>
            )}
            {reviews &&
              reviews.map((review) => {
                return (
                  <Accordion review={review} key={review.id} movieId={id} />
                );
              })}
          </article>
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
                    navigate(`/detail/${movie.id}`, {
                      preventScrollReset: true, // 뒤로가기 시
                    });
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
