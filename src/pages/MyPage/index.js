import React, { useEffect, useState } from "react";
import { getReviewsMovie } from "../../api/Reviews";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { isLoginAtom } from "../../atom";
// import useMe from "../../hooks/useMe";
import styles from "./mypage.module.scss";
import Info from "./InfoBox";
import { MyCarousel } from "../../components/Carousel";
import Comment from "./CommentBox";

const MyPage = () => {
  const [movies] = useState();
  const [movieInfo, setMovieInfo] = useState([0]);
  const [isShow, setIsShow] = useState(false);

  const onClick = (id) => {
    const num = movies.findIndex((item) => item.id === id);
    setMovieInfo(movies[num]);
    setIsShow(true);
  };

  const { id } = useParams();
  const [reviews, setReviews] = useState([]); // review 객체가 들어있는 배열

  const fetchReviews = async () => {
    const response = await getReviewsMovie(id);
    setReviews(response.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [id, reviews]);

  return (
    <section className={styles.wrap}>
      <Info />
      <div className={styles.contentbox}>
        <MyCarousel movieInfo={movieInfo} onClick={onClick} />
      </div>

      <div className={styles.commentbox}>
        <p>작성한 리뷰</p>
        <Comment />
      </div>
      <article className={styles.reviewsWrap}>
        {reviews.length !== 0 || (
          <div className={styles.empty}>
            <p>텅</p>
            <p>첫 리뷰를 남겨보세요✨</p>
          </div>
        )}
        {reviews &&
          reviews.map((review) => {
            return <Comment review={review} key={review.id} movieId={id} />;
          })}
      </article>
    </section>
  );
};

export default MyPage;
