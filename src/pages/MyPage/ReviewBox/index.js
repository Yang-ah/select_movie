import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ModifyIcon,
  TrashIcon,
  SolidStarIcon,
} from '../../../assets/icon';
import useMe from '../../../hooks/useMe';
import { ModifyModal } from './modifyModal';
import { DeleteModal } from './deleteModal';
import { Modal } from '../../../components';
import {
  getReviewsMe,
  deleteReview,
  fetchMyReviews,
} from '../../../api/Reviews';
import dayjs from 'dayjs';
import ReviewCard from '../ReviewCard';

const MyComment = () => {
  const [reviews, setReviews] = useState([]);
  const { me } = useMe();
  const [isUserMe, setIsUserMe] = useState(false);

  const fetchMyReviews = async () => {
    const response = await getReviewsMe(1, 20);
    setReviews(response.data.data);
    console.log('reviews', response.data.data);
  };

  //모달
  const [form, setForm] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenM, setModalOpenM] = useState(false);
  const [modalOpenD, setModalOpenD] = useState(false);
  const [canModify, setCanModify] = useState(false);
  const [modifiedReview, setModifiedReview] = useState({
    // content: content,
    // score: score,
  });
  const isMyReview = async () => {
    const response = await getMyReview(movieId);
    response.data && setIsUserMe(response.data.user.id === written);
  };

  useEffect(() => {
    isMyReview();
  }, [me]);

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setForm(value);
  };

  const closeModal = () => {
    setModalOpenM(false);
    setModalOpenD(false);
  };

  const onClickModify = () => {
    setModalOpenD(false);

    setCanModify(true);
    // setModalOpenM(true);
  };
  const onClickModifyReview = async () => {
    await patchReview(reviews.id);
    await fetchReviews();
    setModalOpenM(false);
  };

  const onClickDelete = () => {
    setModalOpenM(false);
    setModalOpenD(true);
    console.log(modalOpenD);
  };
  const onClickDeleteReview = async (e) => {
    e.preventDefault();
    try {
      const responsePatch = await getReviewsMe();
      if (responsePatch.status === 204) {
        alert('수정완료');
        closeModal();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //await deleteReview(reviews.id);
  //await fetchMyReviews();
  //setModalOpenD(false);

  const onClickDeleteR = async () => {
    await deleteReview(reviews.id);
    await fetchMyReviews();
    setModalOpen(false);
  };

  const onChangeModifiedReview = (e) => {
    const { value } = e.currentTarget;
    setModifiedReview((prev) => {
      return { ...prev, ['content']: value };
    });
  };

  const onPatchReview = async () => {
    await patchReview(reviewId, modifiedReview);
    await fetchReviews();
    setCanModify(false);
  };

  useEffect(() => {
    fetchMyReviews();
  }, [modalOpen, modalOpenM, modalOpenD]);

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
        <ModifyIcon className={styles.icon} />
        내가 작성한 리뷰
      </p>
      <section className={styles.wrapper}>
        <ul className={styles.ul}>
          {records.map((data, i) => {
            return (
              <li className={styles.li} key={i}>
                <ReviewCard
                  title={data.movie.title}
                  createdAt={dayjs(data.createdAt).format('YYYY.MM.DD')}
                  content={data.content}
                  score={data.score}
                  reviewId={data.id}
                  onClickModify={onClickModify}
                  onClickDelete={onClickDelete}
                  fetchMyReviews={fetchMyReviews}
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

      <ModifyModal
        className={styles.modal}
        modalOpen={modalOpenM}
        setModalOpen={setModalOpenM}
        closeModal={closeModal}
        buttonChildren="수정"
        onClick={onClickModifyReview}
      />
      <DeleteModal
        className={styles.modal}
        modalOpen={modalOpenD}
        setModalOpen={setModalOpenD}
        closeModal={closeModal}
        buttonChildren="삭제"
        onClick={onClickDeleteReview}
      />
      <Modal
        className={styles.modal}
        modalOpen1={modalOpen}
        setModalOpen={setModalOpen}
        buttonChildren="삭제"
        onClick={onClickDeleteR}
      >
        ???
      </Modal>
    </>
  );
};

export default MyComment;
