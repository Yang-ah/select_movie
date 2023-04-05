import {React, useState, useEffect} from "react";
import styles from './backOfficeBody.module.scss'
import cx from "classnames";
import { Button, Input, Modal } from "../../../components";
import { 
    CheckIcon,
    SearchIcon, 
    TrashIcon 
} from "../../../assets/icon";
import { getUsers, getUsersCount } from "../../../api/Users";
//import BOmovieModal from "./BOmodal/BOuserModal";
import BOpageNation from "./BOpageNation/BOpageNation";

const title = ["가입일", "이메일", "닉네임", "수정", "탈퇴"];
const LIMIT =10;

const BackOfficeUsers = ()=>{
    const [pageNumber, setPageNumber] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [usersData, setUsersData] = useState();
    const [Count, setCount] = useState();
    const [form, setForm] = useState();
    const [pageNationNumber, setPageNationNumber] = useState();
    const [SelectedIDs, setSelectedIDs] = useState([]);

    const onSetData = (data,total) => {
        const totalPage = Math.ceil(total / LIMIT);
        setUsersData(data);
        setCount(total);
        setPageNationNumber(totalPage);
    }

    const responseData = async ()=>{
        const response1 = await getUsers(pageNumber,LIMIT);
        //const responseCount = await getUsersCount();
        onSetData(response1.data.data,response1.data.paging.total);
    };

    const onSearch = async (e)=>{
        e.preventDefault();
        const response2 = await getUsers(1,LIMIT,form);
        onSetData(response2.data.data, response2.data.paging.total);
        console.log(response2.data.paging);
    }

    const pageUp = () => {
        setPageNumber(pageNumber + 1);
    };
    const pageDown = () => {
        if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        }
    };
    const showModal = (id) => {
        return()=>{
            setSelectedIDs([id]);
            setModalOpen(true);
        }
    };
    const showModal2 = (id) => {
        return()=>{
            setSelectedIDs([id]);
            setModalOpen2(true);
        } 
    };
    const closeModal = ()=>{
        setSelectedIDs([]);
        setModalOpen(false);
        setModalOpen2(false);
    }
    const onChange = (e) => {
        const { value } = e.currentTarget;
        setForm(value);
    };
    const onClickCheckBox = (id) => {
        return (e) => {
            const { checked } = e.currentTarget;
            if (checked){
                setSelectedIDs([...SelectedIDs, id]);
            }else{
                setSelectedIDs(SelectedIDs.filter((x) => x !== id));
            }
        }
    }
    useEffect(()=>{
        responseData();
    },[pageNumber]);

return(
<>
<header className={styles.header}>
    <h3 className={styles.mainTitle}> 유저관리 </h3>
    <form id='searchForm' 
    className={cx(styles.searchInput, styles["iconLocation"])}
    >
      <Input onChange={onChange}
        name="title"
        value={form}
        placeholder='회원이름검색'
        className={styles.inputWrapper} 
        />
      <button type="submit" 
        form="searchForm"
        onClick={onSearch} 
        className={cx(styles.button)}
        >
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
        <input 
            type="checkbox" 
            readOnly 
            hidden
            checked={SelectedIDs.includes(item.id)}
            onClick={onClickCheckBox(item.id)}
            />
        <CheckIcon />
        </label>
    </li>

    <li> {usersData[index].createdAt.slice(0,10)} </li> 
    <li> {usersData[index].email} </li> 
    <li> {usersData[index].name} </li> 

    <li>
        <Button children="수정" 
        onClick={showModal(item.id)}
        id={index}
        />
    </li>
        
    <li>
        <Button children="탈퇴" 
        onClick={showModal2(item.id)}
        id={index}/>
    </li>
        

</ul>   
    
    )
})}
<Modal
        modalOpen1={modalOpen}
        setModalOpen={setModalOpen}
        children='인풋 만들기' 
        buttonChildren='수정' /> 
<Modal
        modalOpen1={modalOpen2}
        setModalOpen={setModalOpen2}
        children='회원을 탈퇴시키겠습니까?' 
        buttonChildren='탈퇴'
        /* buttonClick */ /> 
{/* 페이지네이션 
TODO: 검색 후 페이지 변경시 검색한 데이터가 사라짐, 검색 후 페이지 변경이 안됨*/}
<BOpageNation
pageDown={pageDown}
pageNationNumber={pageNationNumber}
pageNumber={pageNumber}
setPageNumber={setPageNumber}
pageUp={pageUp}
/>
</>
    );
}

export default BackOfficeUsers;