import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./mypage.module.scss";

import Info from "./InfoBox";
import { MyCarousel } from "../../components/Carousel";
import Comments from "./CommentBox";
import { getReviewsMovie } from "../../api/Reviews";
import { getUsersMeInfo } from "../../api/Users";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState();

  const [movies] = useState();
  const [movieInfo, setMovieInfo] = useState([0]);
  const [isShow, setIsShow] = useState(false);

  const fetchUserInfo = async () => {
    const response = await getUsersMeInfo();
    setUserInfo(response.data);
    //    console.log(response.data);
  };

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
    fetchUserInfo();
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
        <Comments />
      </div>
    </section>
  );
};

export default MyPage;
