import React from "react";
import styles from "./rankingTitle.module.scss";
import { motion, useIsPresent } from "framer-motion";

const RankingTitle = () =>{


return(    

    <article className={styles.title}>

    <div className={styles.title} >Movie Selector</div>
    <div className={styles.caption} >리뷰가 살아숨쉬는 공간</div>
    

    </article>

    )
}


export default RankingTitle;