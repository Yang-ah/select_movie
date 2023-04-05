import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../../assets/icon";
import styles from "./BOpageNation.module.scss";
import {range} from 'lodash-es';
import cx from "classnames";
import { number } from "prop-types";
const BOpageNation =({pageDown, pageNationNumber, setPageNumber, pageUp, pageNumber})=>{
    const [isCurrent, setCurrent] =useState();
    
    return(

    <ul className={styles.pagination}>
        <li className={styles.prevIcon}>
        <ChevronLeftIcon
            className={styles.Icon}
            onClick={pageDown}
        />
        </li>
        {range(1, pageNationNumber+1).map((number, i) => (
        <li
            value={i}
            onClick={()=>setPageNumber(number)}
            className={cx(styles.page, {[styles.currentPage]: number===pageNumber})}
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
    </ul>
    )
}

export default BOpageNation;