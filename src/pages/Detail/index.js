import React, { useEffect, useRef, useState } from 'react';
import styles from './detail.module.scss';
import DetailInfo from './DetailInfo';
import Dropdown from '../../components/Common/Dropdown';
import { getMoviesRelated, postMovieLike } from '../../api/Movies';
import { getReviewsMovie } from '../../api/Reviews';
import RelatedCard from './RelatedCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../atom';
import useMe from '../../hooks/useMe';
import Accordion from './Accordion';
import ReviewInput from '../../components/Comment/ReviewInput';

// review dropdown list
const dropdownItems = () => {
  return ['별점높은순', '별점낮은순', '최신순'];
};

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef(null);

  const me = useMe();
  const isLogin = useRecoilValue(isLoginAtom);

  const [relatedMovies, setRelatedMovies] = useState(); // 관련 영화가 들어있는 배열
  const [reviews, setReviews] = useState([]); // review 객체가 들어있는 배열

  // 해당 영화 '관련 영화' fetch
  const fetchRelatedMovies = async () => {
    const response = await getMoviesRelated(id);
    setRelatedMovies(response.data);
  };

  // 해당 영화 리뷰 fetch
  const fetchReviews = async () => {
    const response = await getReviewsMovie(id);
    //  console.log(response.data);
    setReviews(response.data);
  };

  useEffect(() => {
    fetchRelatedMovies();
    fetchReviews();
  }, [id]);

  // 영화 이동시 scroll top으로 이동
  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    fetchRelatedMovies();
    fetchReviews();
  }, [id]);

  // 로그인 상태에 따라 reviewInput의 placeholder 변경
  const inputPlaceholder = () => {
    return isLogin
      ? '10자 이상 입력 시 등록 가능합니다.'
      : '로그인 후 작성하실 수 있습니다.';
  };

  // 로그인 상태에 따라 reviewInput의 userName 변경
  const inputUsername = () => {
    if (me && isLogin) {
      return me.nickname ?? me.name;
    }
    if (!me || !isLogin) {
      return <Link to="/auth/login">로그인 후 작성가능</Link>;
    }
  };

  // aside > RelatedCard 클릭 이벤트
  const navigateOtherMovie = (movieId) => {
    return () => {
      navigate(`/detail/${movieId}`, {
        replace: true,
      });
    };
  };

  return (
    <section ref={ref}>
      <DetailInfo id={id} />
      <section className={styles.sectionWrap}>
        <main className={styles.mainWrap}>
          {/* 영화 리뷰를 입력하는 input  */}
          <ReviewInput
            id={id}
            disabled={!isLogin}
            placeholder={inputPlaceholder()}
            fetchReviews={fetchReviews}
            userName={inputUsername()}
          />
          <header>
            <h1>Reviews</h1>
            <Dropdown items={dropdownItems()} className={styles.dropdown} />
          </header>

          <article className={styles.reviewsWrap}>
            {/* 리뷰가 없을 때 */}
            {reviews.length === 0 && (
              <div className={styles.empty}>
                <p>텅</p>
                <p>첫 리뷰를 남겨보세요✨</p>
              </div>
            )}

            {/* 리뷰가 있을 때 */}
            {reviews &&
              reviews.map((review) => {
                return (
                  <Accordion
                    review={review}
                    key={review.id}
                    movieId={id}
                    fetchReviews={fetchReviews}
                  />
                );
              })}
          </article>
        </main>

        {/* 리뷰(main) 옆에 위치하고 있는 '관련 영화'  */}
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
                  onClick={navigateOtherMovie(movie.id)}
                />
              );
            })}
        </aside>
      </section>
    </section>
  );
};

export default Detail;
