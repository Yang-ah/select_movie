import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './userReview.module.scss';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SolidStarIcon,
} from '../../../assets/icon';
import { getReviewsUser } from '../../../api/Reviews';
import dayjs from 'dayjs';
import UserReviewCard from '../UserReviewCard';

const UserReview = () => {
  const userId = useParams();
  const [reviews, setReviews] = useState([]);

  const fetchMyReviews = async () => {
    const response = await getReviewsUser(userId.id);
    setReviews(response.data);
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = reviews.slice(firstIndex, lastIndex);
  const pageNumber = Math.ceil(reviews.length / recordsPerPage);
  const numbers = [...Array(pageNumber + 1).keys()].slice(1);

  const onClickPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onChangePage = (id) => {
    setCurrentPage(id);
  };
  const onClickNextPage = () => {
    if (currentPage !== pageNumber) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <p className={styles.category}>
        <span className={styles.text}>작성한 리뷰</span>
      </p>
      <section className={styles.wrapper}>
        <ul className={styles.ul}>
          {records.map((data, i) => {
            return (
              <li className={styles.li} key={i}>
                <UserReviewCard
                  title={data.movie.title}
                  createdAt={dayjs(data.createdAt).format('YYYY.MM.DD')}
                  movieId={data.movie.id}
                  content={data.content}
                  score={data.score}
                />
              </li>
            );
          })}
        </ul>

        <ul className={styles.pagination}>
          <li className={styles.prevIcon}>
            <ChevronLeftIcon
              className={styles.Icon}
              onClick={onClickPrevPage}
            />
          </li>
          {numbers.map((number, i) => (
            <li
              className={cx(styles.page, {
                [styles.currentPage]: number === currentPage,
              })}
              key={i}
              onClick={() => onChangePage(number)}
            >
              {number}
            </li>
          ))}
          <li className={styles.nextIcon}>
            <ChevronRightIcon
              className={styles.Icon}
              onClick={onClickNextPage}
            />
          </li>
        </ul>
      </section>
    </>
  );
};

export default UserReview;
