import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./commentBox.module.scss";
import Comment from "./comment";
import { SolidStarIcon, TrashIcon, ModifyIcon } from "../../../assets/icon";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../assets/icon";
import { FixModal, DeleteModal } from "../CommentModal";
import { getReviewsMe } from "../../../api/Reviews";
import { isLoginAtom } from "../../../atom";
import { useRecoilValue } from "recoil";

const Pagination = () => {
  // const navigate = useNavigate;
  // const isLogin = useRecoilValue(isLoginAtom);
  // const [review, setReview] = useState([]);

  // const fetchMyReviews = async () => {
  //   const response = await getReviewsMe(1, 20);
  //   setReview(response.data);
  //   console.log(response.data);
  // };

  // useEffect(() => {
  //   fetchMyReviews();
  // }, []);

  const [fixModalOpen, setFixModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const showFixModal = () => {
    setFixModalOpen(true);
  };
  const showDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerPage = 8;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = review.slice(firstIndex, lastIndex);
  // const pageNumber = Math.ceil(review.length / recordsPerPage);
  // const numbers = [...Array(pageNumber + 1).keys()].slice(1);

  // const onClickPrevPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  // const onChangePage = (id) => {
  //   setCurrentPage(id);
  // };
  // const onClickNextPage = () => {
  //   if (currentPage !== pageNumber) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <>
      <p>ㄷㄷ</p>
      <section className={styles.wrap}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            {/* {isLogin &&
              review &&
              review?.map((review) => (
                <div className={styles.wrapper}>
                  <div className={styles.screen}>
                    <section className={styles.screen}>
                      <article className={styles.layerUp}>
                        <button
                          className={styles.fixModal}
                          onClick={showFixModal}
                        >
                          <ModifyIcon className={styles.icon} height="24px" />
                        </button>
                        <button
                          className={styles.deleteModal}
                          onClick={showDeleteModal}
                        >
                          <TrashIcon className={styles.icon} height="24px" />
                        </button>
                      </article>

                      <article className={styles.layerDown}>
                        <aside className={styles.top}>
                          <div className={styles.left}>
                            <p className={styles.title}>{review.id}</p>
                            <p className={styles.createAt}>{review.createAt}</p>
                          </div>
                          <div className={styles.score}>
                            <SolidStarIcon className={styles.star} />
                            {review.score}
                          </div>
                        </aside>
                        <p className={styles.content}>
                          {review.content.length > 200
                            ? review.content.substring(0, 200) + "..."
                            : review.content}
                        </p>
                      </article>
                    </section>
                  </div>
                </div>
              ))} */}
          </li>
        </ul>

        {/* <ul className={styles.pagination}>
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
        </ul> */}
      </section>
      <FixModal
        className={styles.fixModal}
        modalOpen1={fixModalOpen}
        setModalOpen={setFixModalOpen}
        notion="리뷰 수정"
        children="review"
        buttonChildren="완료"
      />
      <DeleteModal
        className={styles.deleteModal}
        modalOpen1={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        notion="리뷰 삭제"
        children={"삭제?"}
        buttonChildren="완료"
        color="red"
      />
    </>
  );
};

export default Pagination;
