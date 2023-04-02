import React, { useEffect, useState } from "react";
import { getMovies } from "../../../../api/Movies";
import styles from "./tableData.module.scss";

const MoviesTableData = ({i, page})=>{

    const [movieData, setMovieData] = useState({
        id:'',
        title :'제목',
        releasedAt : '개봉일',
        averageScore : '평균평점',
    });

    const responseData = async ()=>{
        const response1 = await getMovies(page,20);
        
        setMovieData({
            id : response1.data.data[i].id,
            title : response1.data.data[i].title,
            releasedAt : response1.data.data[i].releasedAt,
            averageScore : response1.data.data[i].averageScore,
        })
    }
    useEffect(()=>{
        responseData();
    },[page]);

return(
<>
    <li className={styles.title}> {movieData.title} </li>
    <li> {movieData.releasedAt} </li>
    <li> {movieData.averageScore} </li>
</>
)
}

export default MoviesTableData