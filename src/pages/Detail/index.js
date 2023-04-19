import React, { useEffect, useRef, useState } from 'react';
import styles from './detail.module.scss';
import DetailInfo from './DetailInfo';
import Dropdown from '../../components/Common/Dropdown';
import { getMoviesRelated } from '../../api/Movies';
import { getReviewsMovie } from '../../api/Reviews';
import RelatedCard from './RelatedCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../status';
import useMe from '../../hooks/useMe';
import Accordion from './Accordion';
import ReviewInput from '../../components/Comment/ReviewInput';
import { motion } from 'framer-motion';

// review dropdown list
const dropdownItems = [
  { title: '별점높은순', value: 'SCORE_HIGH' },
  { title: '별점낮은순', value: 'SCORE_LOW' },
  { title: '최신순', value: 'CREATED_AT' },
];

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { me } = useMe();
  const ref = useRef(null);
  const isLogin = useRecoilValue(isLoginAtom);

  const [relatedMovies, setRelatedMovies] = useState(); // 관련 영화가 들어있는 배열
  const [reviews, setReviews] = useState([]); // review 객체가 들어있는 배열
  const [orderBy, setOrderBy] = useState({
    title: '최신순',
    value: 'CREATED_AT',
  });

  // 해당 영화 '관련 영화' fetch
  const fetchRelatedMovies = async () => {
    const response = await getMoviesRelated(id);
    const relatedArr = response.data.filter((related) => related.id !== id);
    setRelatedMovies(relatedArr);
  };

  // 해당 영화 리뷰 fetch
  const fetchReviews = async () => {
    const response = await getReviewsMovie(id, orderBy.value);
    setReviews(response.data);
  };

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
      return '로그인 후 작성가능';
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

  useEffect(() => {
    fetchReviews();
  }, [orderBy]);

  return (
    <main ref={ref}>
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <DetailInfo id={id} />

        <section className={styles.sectionWrap}>
          <main className={styles.mainWrap}>
            {/* 영화 리뷰를 입력하는 input  */}
            <ReviewInput
              id={id}
              disabled={!isLogin}
              //NOTE: props로 넘기는 함수 / 값 => 함수 : useCallback, 값 : useMemo
              placeholder={inputPlaceholder()}
              fetchReviews={fetchReviews}
              userName={inputUsername()}
            />
            <header>
              <h1>Reviews</h1>
              <Dropdown
                items={dropdownItems}
                className={styles.dropdown}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />
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
      </motion.div>
    </main>
  );
};

export default Detail;
