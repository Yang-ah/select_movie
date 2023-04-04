import {React, useState, useEffect} from "react";
import { getMovies, getMoviesCount } from "../../../api/Movies";
import styles from './backOfficeBody.module.scss'
import cx from "classnames";
import { Button, Input, Modal, SearchInput } from "../../../components";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, TrashIcon } from "../../../assets/icon";
import BOmovieModal from "./BOmodal/BOmovieModal";
const BackOfficeMovies = ()=>{
    const [pageNumber, setPageNumber] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonNumber, setButtonNumber] = useState();
    const [movieData, setMovieData] = useState();
    const [Count, setCount] = useState();
    const [form, setForm] = useState();
    const [pageNationNumber, setPageNationNumber] = useState();

    const responseData = async ()=>{
        const response1 = await getMovies(pageNumber,10);
        const responseCount = await getMoviesCount();
        setMovieData(response1.data.data);
        setCount(responseCount.data.count);
        const totalPage = Math.ceil(responseCount.data.count/10)
        setPageNationNumber(totalPage);
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



    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setForm(value);
    };

    const onSearch = async (e)=>{
        e.preventDefault();
        if(form.length<2){return alert('두 글자 이상을 검색해 주세요')}
        const response2 = await getMovies(1,Count,form);
        setMovieData(response2.data.data);
    }
    
    const title = ['영화제목',"개봉일", "평균평점",  "수정"];

    const pageNationNumbers = Array(pageNationNumber).fill().map((v,i)=>i+1);

return(
<>
<header className={styles.header}>
    <h3 className={styles.mainTitle}>
        영화관리
    </h3>
    <form id='searchForm' className={cx(styles.searchInput, styles["iconLocation"])}>
      <Input onChange={onChange}
        name="title"
        value={form}
        placeholder='영화 제목을 두글자 이상 검색해주세요'
        className={styles.inputWrapper} />
      <button type="submit" form="searchForm"
        onClick={onSearch} className={cx(styles.button)}>
        <SearchIcon />
      </button>
    </form>
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
    <Button children="수정" onClick={showModal} id={index} />
    </li>
    
    </ul>   
    )
})}
<BOmovieModal
className={styles.modal}
modalOpen1={modalOpen}
setModalOpen={setModalOpen}
children='a'
buttonChildren='수정'
num='인덱스값 넣기1'/>

{/* 페이지네이션 */}
<ul className={styles.pagination}>
    <li className={styles.prevIcon}>
    <ChevronLeftIcon
        className={styles.Icon}
        onClick={pageDown}
    />
    </li>
    {pageNationNumbers.map((number, i) => (
    <li
        className="currentPage"
        key={i}
        onClick={() => setPageNumber(number)}
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
</>
    );
}

export default BackOfficeMovies;