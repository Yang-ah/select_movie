import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SolidStarIcon,
} from '../../../assets/icon';
import { getReviewsUser } from '../../../api/Reviews';
import dayjs from 'dayjs';

const UserReview = () => {
  const userId = useParams();
  const [reviews, setReviews] = useState([]);

  const fetchMyReviews = async () => {
    const response = await getReviewsUser(userId.id);
    setReviews(response.data);
    console.log('reviews', response.data);
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  //모달
  const [form, setForm] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpenM(false);
    setModalOpenD(false);
  };

  const onClick = () => {
    navigate(`/detail/${movieId.id}`);
  };

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
        <span className={styles.text}>
          작성한 리뷰 (수정,삭제 대신 코멘트 쪽 누르면 디테일로 넘어가게!! )
        </span>
      </p>
      <section className={styles.wrapper}>
        <ul className={styles.ul}>
          {records.map((data, i) => {
            return (
              <li className={styles.li} key={i}>
                <section className={styles.screen} onClick={onClick}>
                  <aside className={styles.top}>
                    <div className={styles.left}>
                      <p className={styles.title}>{data.movie.title}</p>
                      <p className={styles.createdAt}>
                        {dayjs(data.createdAt).format('YYYY.MM.DD')}
                      </p>
                    </div>
                    <div className={styles.right}>
                      <SolidStarIcon className={styles.star} />
                      {data.score}
                    </div>
                  </aside>
                  <Link to={`/detail/${data.movie?.id}`}>
                    <main>{data.content}</main>
                  </Link>
                </section>
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
