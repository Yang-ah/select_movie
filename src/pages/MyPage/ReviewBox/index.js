import React, { useState, useEffect } from 'react';
import styles from './reviewBox.module.scss';
import { ModifyIcon } from '../../../assets/icon';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  SolidStarIcon,
} from '../../../assets/icon';
import { FixModal } from '../Modal/reviewModal';
import { DeleteModal } from '../Modal/deleteModal';
import { getReviewsMe } from '../../../api/Reviews';
import dayjs from 'dayjs';
import { Modal } from '../../../components';
import ReviewCard from '../ReviewCard';

const MyComment = () => {
  const [reviews, setReviews] = useState([]);

  const fetchMyReviews = async () => {
    const response = await getReviewsMe(1, 20);
    setReviews(response.data.data);
    console.log(response.data.data);
  };

  //modal
  const [form, setForm] = useState();
  const [ReviewsData, setReviewsData] = useState();
  const [fixModalOpen, setFixModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectIndex, setSelectIndex] = useState();

  const showFixModal = () => {
    setDeleteModalOpen(false);
    setFixModalOpen(true);
  };
  const showDeleteModal = () => {
    setFixModalOpen(false);
    setDeleteModalOpen(true);
  };
  const closeModal = () => {
    setFixModalOpen(false);
    setDeleteModalOpen(false);
  };
  const onChange = (e) => {
    const { value } = e.currentTarget;
    setForm(value);
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

  useEffect(() => {
    fetchMyReviews();
  }, [fixModalOpen, deleteModalOpen]);

  return (
    <>
      <p className={styles.category}>
        <ModifyIcon className={styles.icon} />
        내가 작성한 리뷰ccc
      </p>
      <section className={styles.wrapper}>
        <ul className={styles.ul}>
          {records.map((data, i) => {
            return (
              <li className={styles.li} ket={i}>
                <ReviewCard
                  title={data.title}
                  content={data.content}
                  createdAt={dayjs(data.createdAt).format('YYYY.MM.DD')}
                  score={data.score}
                  showFixModal={showFixModal}
                  showDeleteModal={showDeleteModal}
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
              className="currentPage"
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
      <FixModal
        className={styles.fixModal}
        fixModalOpen={fixModalOpen}
        setFixModalOpen={setFixModalOpen}
        closeModal={closeModal}
        notion="리뷰 수정"
        children="review"
        buttonChildren="완료"
      />
      <DeleteModal
        className={styles.deleteModal}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        closeModal={closeModal}
        notion="리뷰 삭제"
        children={'삭제?'}
        buttonChildren="완료"
        userORreview="review"
      />
    </>
  );
};

export default MyComment;
