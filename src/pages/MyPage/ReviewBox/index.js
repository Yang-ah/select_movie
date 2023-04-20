import React, { useState, useEffect } from 'react';
import styles from './reviewBox.module.scss';
import cx from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../assets/icon';
import { getReviewsMe } from '../../../api/Reviews';
import dayjs from 'dayjs';
import Review from '../ReviewCard';

const MyReview = () => {
  const [reviews, setReviews] = useState([]);

  const fetchMyReviews = async () => {
    const response = await getReviewsMe(1, 20);
    setReviews(response.data.data);
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
    <section className={styles.wrapper}>
      <ul className={styles.ul}>
        {records.map((data, i) => {
          return (
            <li className={styles.li} key={i}>
              <Review
                title={data.movie.title}
                movieId={data.movie.id}
                createdAt={dayjs(data.createdAt).format('YYYY.MM.DD')}
                content={data.content}
                score={data.score}
                reviewId={data.id}
                fetchMyReviews={fetchMyReviews}
              />
            </li>
          );
        })}
      </ul>

      <ul className={styles.pagination}>
        <li className={styles.prevIcon}>
          <ChevronLeftIcon className={styles.Icon} onClick={onClickPrevPage} />
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
          <ChevronRightIcon className={styles.Icon} onClick={onClickNextPage} />
        </li>
      </ul>
    </section>
  );
};

export default MyReview;
