import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../../assets/icon";
import styles from "./BOpageNation.module.scss";
import {range} from 'lodash-es';
import cx from "classnames";
import { number } from "prop-types";
const BOpageNation =({pageDown, pageNationNumber, setPageNumber, pageUp, pageNumber, SearchPageNumber})=>{
    const maxNum = 10;
    const lastPage = Math.ceil(pageNationNumber/maxNum);
    //console.log(lastPage);
    const [navNum, setNavNum] =useState({
        start : 1,
        end : maxNum,
    });

    const navUp = () => {
        if (navNum.end < pageNationNumber) {
          setNavNum({
            start : navNum.start+maxNum,
            end : navNum.end + maxNum,
        })
        }
      };
      const navDown = () => {
        if (navNum.start > 1) {
            setNavNum({
                start : navNum.start - maxNum,
                end : navNum.end - maxNum,
            })
        }
      };

    return(

    <ul className={styles.pagination}>
        { pageNationNumber>maxNum+1 && 
        <li onClick={navDown}>-{maxNum}</li>}

        <li className={styles.prevIcon}>
            <ChevronLeftIcon
                className={styles.Icon}
                onClick={pageDown}
            />
        </li>

        {pageNationNumber<maxNum+1 ?
        range(1, pageNationNumber+1).map((number, i) => (
            <li
                value={i}
                onClick={()=>setPageNumber(number)}
                className={cx(styles.page, {[styles.currentPage]: number===pageNumber })}
            >
                {number}
            </li>
            ))
        :range(navNum.start, navNum.end+1).map((number, i) => (
        <li
            value={i}
            onClick={()=>setPageNumber(number)}
            className={cx(styles.page, {[styles.currentPage]: number===pageNumber })}
        >
            {number}
        </li>
        ))}

        <li className={styles.nextIcon}>
            <ChevronRightIcon
                className={styles.Icon}
                onClick={pageUp}
            />
        </li>
        { pageNationNumber>maxNum+1 && <li onClick={navUp}>+{maxNum}</li>}
    </ul>
    )
}

export default BOpageNation;