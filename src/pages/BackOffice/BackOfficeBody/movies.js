import {React, useState, useEffect} from "react";
import { getMovies } from "../../../api/Movies";
import styles from './backOfficeBody.module.scss'
import { Button, Modal, SearchInput } from "../../../components";
import { CheckIcon, TrashIcon } from "../../../assets/icon";
const BackOfficeMovies = ()=>{
    const [pageNumber, setPageNumber] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonNumber, setButtonNumber] = useState(0);
    const [movieData, setMovieData] = useState();

    const responseData = async ()=>{
        const response1 = await getMovies(pageNumber,10);
        setMovieData(response1.data.data);
    };


    useEffect(()=>{
        responseData();
    },[pageNumber]);

    const pageUp = () => {
        setPageNumber(pageNumber + 1);
    };
    const pageDown = () => {
        if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        }
    };
    const showModal = () => {
        
        setModalOpen(true);
    };

    const title = ['영화제목',"개봉일", "평균평점",  "수정"];

return(
<>
<header className={styles.header}>
    <h3 className={styles.mainTitle}>
        영화관리
    </h3>
    <SearchInput
        option="iconLocation"
        className={styles.searchInput}
        placeholder="내용을 입력하세요."
    />
    <Button>
        삭제
        <TrashIcon />
    </Button>
</header>
    {/* 표머리 */}
<ul className={styles.title}>
    <li>선택</li>
    {title.map((item, index) => {
    return <li key={index}>{item}</li>;
    })}
</ul>
    {/* 표 몸통 */}
{!!movieData && movieData.map((item, index)=>{
    return(
    <ul className={styles.tableRow}>
    <li className={styles.checkbox}>
        <label className={styles.checkBox}>
        <input type="checkbox" readOnly hidden/>
        <CheckIcon />
        </label>
    </li>

    <li> {movieData[index].title} </li> 
    <li> {movieData[index].releasedAt} </li> 
    <li> {!!movieData[index].averageScore && movieData[index].averageScore.toFixed(1)} </li>  

    <li>
    <Button children="수정" num={index} onClick={showModal}  />
    </li>
    
    </ul>   
    )
})}
<Modal className={styles.modal}
    modalOpen1={modalOpen}
    setModalOpen={setModalOpen}
    children={buttonNumber}
    buttonChildren='수정' />

{/* 페이지네이션 추가하기 */}
<button onClick={pageDown}>[페이지 다운]</button>
<button onClick={pageUp}>[페이지 업]</button>
<p>{pageNumber}</p>
</>
    );
}

export default BackOfficeMovies;