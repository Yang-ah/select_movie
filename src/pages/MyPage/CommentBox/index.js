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
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);

  //NOTE: pageNumber
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  //NOTE: 함수는 return 보다 위에 위치
  //NOTE: 일반함수 -> 화살표함수

  //NOTE: onClickPrevIcon , onClickNextPage, onChangePage
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
  console.log({ data });
  //NOTE: section과 article, aside 요런 태그들
  return (
    <section className={styles.wrapper}>
      <ul className={styles.main}>
        {records.map((data, i) => (
          // NOTE: key에는 index보다는 고유한 id값을 사용하는 것이 좋다
          <li className={styles.box} key={i}>
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
            {/* <main> */}
            <p className={styles.comment}>{data.comment}</p>
            {/* </main> */}
            <article className={styles.bottom}>
              <span className={styles.upDown}>
                {/* //NOTE: 간격 떨어뜨리기 */}
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
      {/* //NOTE: className 의미가 있는 단어로 교체 */}
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.prev}>
            <ChevronLeftIcon className={styles.Icon} onClick={prevPage} />
          </li>
          {numbers.map((number, i) => (
            <li
              className="currentPage"
              key={i}
              onClick={() => changePage(number)}
            >
              {number}
            </li>
          ))}
          <li className={styles.next}>
            <ChevronRightIcon className={styles.Icon} onClick={nextPage} />
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Pagination;
