import {React, useState, useEffect} from "react";
import styles from './backOfficeBody.module.scss'
import { Button, Modal, SearchInput } from "../../../components";
import { CheckIcon, TrashIcon } from "../../../assets/icon";
import { getReviews } from "../../../api/Reviews";
import cx from "classnames";
const BackOfficeReviews = ()=>{
    const [pageNumber, setPageNumber] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [ReviewsData, setReviewsData] = useState();

    const responseData = async ()=>{
        const response1 = await getReviews(pageNumber,10);
        setReviewsData(response1.data.data);
        //console.log(response1.data.data)
        console.log(ReviewsData)
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
    const showModal2 = () => { setModalOpen2(true); };

    const title = ["작성일", "작성자",  "작성내용", "더보기", "삭제"]

return(
<>
<header className={styles.header}>
    <h3 className={styles.mainTitle}>
        리뷰관리
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
<ul className={cx(styles.title, 
    { [styles.Reviews]:true},
    )}>
    <li>선택</li>
    {title.map((item, index) => {
    return <li key={index}>{item}</li>;
    })}
</ul>
    {/* 표 몸통 */}
{!!ReviewsData && ReviewsData.map((item, index)=>{
    return(
<ul className={cx(styles.tableRow, 
    { [styles.Reviews]: true })}>
    <li className={styles.checkbox}>
        <label className={styles.checkBox}>
        <input type="checkbox" readOnly hidden/>
        <CheckIcon />
        </label>
    </li>

    <li> {ReviewsData[index].createdAt.slice(0,10)} </li> 
    <li> {ReviewsData[index].user.name} </li> 
    <li> {ReviewsData[index].content} </li> 

    <li>
        <Button children="더보기" onClick={showModal}/>
    </li>
        <Modal
        modalOpen1={modalOpen}
        setModalOpen={setModalOpen}
        children='인풋 만들기' 
        buttonChildren='수정' /> 
    <li>
        <Button children="탈퇴" onClick={showModal2}/>
    </li>
        <Modal
        modalOpen1={modalOpen2}
        setModalOpen={setModalOpen2}
        children='회원을 탈퇴시키겠습니까?' 
        buttonChildren='탈퇴'
        /* buttonClick */ /> 

</ul>   
    
    )
})}


{/* 페이지네이션 추가하기 */}
<button onClick={pageDown}>[페이지 다운]</button>
<button onClick={pageUp}>[페이지 업]</button>
<p>{pageNumber}</p>
</>
    );
}

export default BackOfficeReviews;