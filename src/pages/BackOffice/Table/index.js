import { TrashIcon } from "../../../assets/icon";
import Button from "../../../components/Common/Button";
import SearchInput from "../../../components/Common/SearchInput";
import TableTitle from "./TableTitle";
import styles from "./table.module.scss";
import TableRow from "./TableRow";
import MoviesTableData from "./TableData/moviesData";
import UsersTableData from "./TableData/userData";
import ReviewsTableData from "./TableData/reviewData";
const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Table = ({ path }) => {
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
      {path === "movies" && testArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<MoviesTableData path={path} i={index}/>}
        />;})} 
      {path === "users" && testArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<UsersTableData path={path} i={index}/>}
        />;})} 
      {path === "reviews" && testArr.map((item, index) => {
        return <TableRow path={path} key={item} 
        children={<ReviewsTableData path={path} i={index}/>}
        />;})} 
    </>
  );
};

export default Table;
