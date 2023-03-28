import React, { useState } from "react";
import styles from "./pagination.module.scss";

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
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        {records.map((data, i) => (
          <div className={styles.box} key={i}>
            <top className={styles.top}>
              <div className={styles.left}>
                <p className={styles.title}>{data.title}</p>
                <p className={styles.date}>{data.date}</p>
              </div>
              <div className={styles.rating}>
                <SolidStarIcon className={styles.star} />
                {data.rating}
              </div>
            </top>
            <main>
              <p className={styles.comment}>{data.comment}</p>
            </main>
            <bottom className={styles.bottom}>
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
            </bottom>
          </div>
        ))}
      </main>

      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.prev}>
            <a href="#" className="pagelink" onClick={prevPage}>
              <ChevronLeftIcon className={styles.Icon} />
            </a>
          </li>
          {numbers.map((n, i) => (
            <li href="#" className="pagelink" key={i}>
              <a
                className={styles.pagelink}
                href="#"
                onClick={() => changePage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className={styles.next}>
            <a href="#" className="pagelink" onClick={nextPage}>
              <ChevronRightIcon className={styles.Icon} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changePage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default Pagination;
