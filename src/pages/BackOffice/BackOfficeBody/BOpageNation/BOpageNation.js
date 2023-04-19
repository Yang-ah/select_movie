import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronRightIcon,
} from '../../../../assets/icon';
import styles from './BOpageNation.module.scss';
import { range } from 'lodash-es';
import cx from 'classnames';
import { number } from 'prop-types';
const BOpageNation = ({
  pageNationNumber,
  setPageNumber,
  pageNumber,
  SearchPageNumber,
}) => {
  const maxNum = 10;
  const lastPage = Math.ceil(pageNationNumber / maxNum);
  const [navNum, setNavNum] = useState({
    start: 1,
    end: maxNum,
  });
  const pageUp = () => {
    if (pageNumber < pageNationNumber) {
      setPageNumber(pageNumber + 1);
      if (pageNumber % maxNum === 0) {
        navUp();
      }
    }
  };
  const pageDown = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      if (pageNumber % maxNum === 1) {
        navDown();
        setPageNumber(navNum.start - 1);
      }
    }
  };
  const navUp = () => {
    if (navNum.end < pageNationNumber) {
      setNavNum({
        start: navNum.start + maxNum,
        end: navNum.end + maxNum,
      });
      setPageNumber(navNum.start + maxNum);
    }
  };
  const navDown = () => {
    if (navNum.start > 1) {
      setNavNum({
        start: navNum.start - maxNum,
        end: navNum.end - maxNum,
      });
      setPageNumber(navNum.start - maxNum);
    }
  };

  return (
    <ul className={styles.pagination}>
      {pageNationNumber > maxNum + 1 && navNum.start !== 1 && (
        <li>
          <DoubleChevronRightIcon className={styles.IconR} onClick={navDown} />
        </li>
      )}

      <li className={styles.prevIcon}>
        <ChevronLeftIcon className={styles.Icon} onClick={pageDown} />
      </li>

      {pageNationNumber < navNum.end
        ? range(navNum.start, pageNationNumber + 1).map((number, i) => (
            <li
              value={i}
              onClick={() => setPageNumber(number)}
              className={cx(styles.page, {
                [styles.currentPage]: number === pageNumber,
              })}
            >
              {number}
            </li>
          ))
        : range(navNum.start, navNum.end + 1).map((number, i) => (
            <li
              value={i}
              onClick={() => setPageNumber(number)}
              className={cx(styles.page, {
                [styles.currentPage]: number === pageNumber,
              })}
            >
              {number}
            </li>
          ))}

      <li className={styles.nextIcon}>
        <ChevronRightIcon className={styles.Icon} onClick={pageUp} />
      </li>
      {pageNationNumber > maxNum + 1 && navNum.end < pageNationNumber && (
        <li>
          <DoubleChevronRightIcon className={styles.Icon} onClick={navUp} />
        </li>
      )}
    </ul>
  );
};

export default BOpageNation;
