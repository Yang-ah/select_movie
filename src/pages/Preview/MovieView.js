import React from "react";
import styles from "./movieview.module.scss"

const MovieView = ({movieInfo , onOpen}) => {

    const {thumbUrl,movieNm} = movieInfo

     return (
        <div className={styles.view} onClick={onOpen}>
            <img src={thumbUrl} alt={movieNm}/>
            <div>
            </div>
        </div>
     )   

}

export default MovieView;