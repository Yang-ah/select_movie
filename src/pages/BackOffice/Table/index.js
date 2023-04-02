import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "../../../assets/icon";
import Button from "../../../components/Common/Button";
import SearchInput from "../../../components/Common/SearchInput";
import TableTitle from "./TableTitle";
import styles from "./table.module.scss";
import TableRow from "./TableRow";
import MoviesTableData from "./TableData/moviesData";
import UsersTableData from "./TableData/userData";
import ReviewsTableData from "./TableData/reviewData";
import { useState } from "react";

//TODO: Page Nation
//TODO: 수정 삭제 기능
//TODO: 검색기능
const Table = ({ path }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const AddArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const pageUp = ()=>{
    setPageNumber(pageNumber+1);
  }
  const pageDown = ()=>{
    if(pageNumber>1){
      setPageNumber(pageNumber-1);
    }
  }
  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.mainTitle}>
          {path === "movies" && "영화관리"}
          {path === "reviews" && "리뷰관리"}
          {path === "users" && "회원관리"}
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
      <TableTitle path={path} />

      {path === "movies" && (pageNumber%2===1) && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<MoviesTableData path={path} page={(pageNumber+1)/2} i={index}/>}
        />;})}
      {path === "movies" && (pageNumber%2===0) && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<MoviesTableData path={path} page={pageNumber/2} i={index+10}/>}
        />;})}

      {path === "users" && (pageNumber%2===1) && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<UsersTableData path={path} page={(pageNumber+1)/2} i={index}/>}
        />;})}
      {path === "users" && (pageNumber%2===0) && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<UsersTableData path={path} page={pageNumber/2} i={index+10}/>}
        />;})}

      {path === "reviews" && (pageNumber%2===1) && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<ReviewsTableData path={path} page={(pageNumber+1)/2} i={index}/>}
        />;})}
      {path === "reviews" && (pageNumber%2===0) && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<ReviewsTableData path={path} page={pageNumber/2} i={index+10}/>}
        />;})}

      {/* 페이지네이션 추가하기 */}
        <button onClick={pageDown}>[페이지 다운]</button>
        <button onClick={pageUp}>[페이지 업]</button>
        <p>{pageNumber}</p>
    </>
  );
};

export default Table;
