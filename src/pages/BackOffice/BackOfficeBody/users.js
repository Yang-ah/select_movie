import {React, useState, useEffect} from "react";
import styles from './backOfficeBody.module.scss'
import { Button, Input, Modal, SearchInput } from "../../../components";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, TrashIcon } from "../../../assets/icon";
import { getUsers, getUsersCount } from "../../../api/Users";
import cx from "classnames";
const BackOfficeUsers = ()=>{
    const [pageNumber, setPageNumber] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [usersData, setUsersData] = useState();
    const [Count, setCount] = useState();
    const [form, setForm] = useState();
    const [pageNationNumber, setPageNationNumber] = useState();

    const responseData = async ()=>{
        const response1 = await getUsers(pageNumber,10);
        const responseCount = await getUsersCount();
        setUsersData(response1.data.data);
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
    const showModal2 = () => { setModalOpen2(true); };

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setForm(value);
    };

    const onSearch = async (e)=>{
        e.preventDefault();
        const response2 = await getUsers(1,Count,form);
        setUsersData(response2.data.data);
    }

    const title = ["가입일", "이메일", "닉네임", "수정", "탈퇴"];

    const pageNationNumbers = Array(pageNationNumber).fill().map((v,i)=>i+1);

return(
<>
<header className={styles.header}>
    <h3 className={styles.mainTitle}>
        유저관리
    </h3>
    <form id='searchForm' className={cx(styles.searchInput, styles["iconLocation"])}>
      <Input onChange={onChange}
        name="title"
        value={form}
        placeholder='회원이름검색'
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
<ul className={cx(styles.title, 
    { [styles.users]:true},
    )}>
    <li>선택</li>
    {title.map((item, index) => {
    return <li key={index}>{item}</li>;
    })}
</ul>
    {/* 표 몸통 */}
{!!usersData && usersData.map((item, index)=>{
    return(
<ul className={cx(styles.tableRow, 
    { [styles.users]: true })}>
    <li className={styles.checkbox}>
        <label className={styles.checkBox}>
        <input type="checkbox" readOnly hidden/>
        <CheckIcon />
        </label>
    </li>

    <li> {usersData[index].createdAt.slice(0,10)} </li> 
    <li> {usersData[index].email} </li> 
    <li> {usersData[index].name} </li> 

    <li>
        <Button children="수정" onClick={showModal}/>
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

export default BackOfficeUsers;