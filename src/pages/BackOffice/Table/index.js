import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "../../../assets/icon";
import Button from "../../../components/Common/Button";
import SearchInput from "../../../components/Common/SearchInput";
import TableTitle from "./TableTitle";
import styles from "./table.module.scss";
import TableRow from "./TableRow";
import MoviesTableData from "./TableData/moviesData";
import UsersTableData from "./TableData/userData";
import ReviewsTableData from "./TableData/reviewData";
import PageNation from "./PageNation";
import { useState } from "react";

//TODO: Page Nation
//TODO: 수정 삭제 기능
//TODO: 검색기능
const Table = ({ path }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const AddArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const EvenArr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const pageUp = ()=>{
    setPageNumber(pageNumber+1);
    console.log(pageNumber)
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
      {path === "movies" && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<MoviesTableData path={path} page={pageNumber} i={index}/>}
        />;})} 
      {path === "users" && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<UsersTableData path={path} page={pageNumber} i={index}/>}
        />;})} 
      {path === "reviews" && AddArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<ReviewsTableData path={path} page={pageNumber} i={index}/>}
        />;})} 
        <button onClick={pageUp}>+</button>
      {/* <PageNation/> */}
    </>
  );
};

export default Table;
