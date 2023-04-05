import React, { useState } from "react";
import styles from "./commentBox.module.scss";
import data from "../../../mock_review.json";
import {
  SolidStarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  ModifyIcon,
} from "../../../assets/icon";
import { FixModal, DeleteModal } from "../CommentModal";

const Pagination = () => {
  const [fixModalOpen, setFixModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const showFixModal = () => {
    setFixModalOpen(true);
  };
  const showDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const pageNumber = Math.ceil(data.length / recordsPerPage);
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
  //  console.log({ data });

  return (
    <>
      <section className={styles.wrapper}>
        <ul className={styles.ul}>
          {records.map((data, id) => (
            <li className={styles.li} key={id}>
              <section className={styles.screen}>
                <div className={styles.layerUp}>
                  <button className={styles.fixModal} onClick={showFixModal}>
                    <ModifyIcon className={styles.icon} />
                  </button>
                  <button
                    className={styles.deleteModal}
                    onClick={showDeleteModal}
                  >
                    <TrashIcon className={styles.icon} />
                  </button>
                </div>
                <div className={styles.layerDown}>
                  <article className={styles.top}>
                    <div className={styles.left}>
                      <p className={styles.title}>{data.title}</p>
                      <p className={styles.date}>{data.date}</p>
                    </div>
                    <div className={styles.rating}>
                      <SolidStarIcon className={styles.star} />
                      {data.rating}
                    </div>
                  </article>

                  <p className={styles.comment}>
                    {data.comment.length > 200
                      ? data.comment.substring(0, 200) + "..."
                      : data.comment}
                  </p>

                  <article className={styles.bottom}>
                    <span className={styles.count}>
                      <div className={styles.hateCount}>
                        <ThumbsUpIcon />
                        {data.liked_up}
                      </div>
                      <div className={styles.hateCount}>
                        <ThumbsDownIcon />
                        {data.liked_down}
                      </div>
                    </span>
                  </article>
                </div>
              </section>
            </li>
          ))}
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
