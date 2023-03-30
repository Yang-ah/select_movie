import React, { useState } from "react";
import styles from "./commentBox.module.scss";
import data from "../../../mock_review.json";
import {
  SolidStarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../../assets/icon";

const Pagination = () => {
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
  console.log({ data });

  return (
    <section className={styles.wrapper}>
      <ul className={styles.main}>
        {records.map((data, id) => (
          <li className={styles.box} key={id}>
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
              <span className={styles.upDown}>
                <div className={styles.up}>
                  <ThumbsUpIcon />
                  {data.liked_up}
                </div>
                <div className={styles.down}>
                  <ThumbsDownIcon />
                  {data.liked_down}
                </div>
              </span>
            </article>
          </li>
        ))}
      </ul>
      <ul className={styles.pagination}>
        <li className={styles.prev}>
          <ChevronLeftIcon className={styles.Icon} onClick={onClickPrevPage} />
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
        <li className={styles.next}>
          <ChevronRightIcon className={styles.Icon} onClick={onClickNextPage} />
        </li>
      </ul>
    </section>
  );
};

export default Pagination;
