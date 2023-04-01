import { TrashIcon } from "../../../assets/icon";
import Button from "../../../components/Common/Button";
import SearchInput from "../../../components/Common/SearchInput";
import TableTitle from "./TableTitle";
import styles from "./table.module.scss";
import TableRow from "./TableRow";

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
    {/* 1. 서버에서 데이터를 받아서 
        2. TableRow에 children에 넣어주기 */}
      <TableTitle path={path} />
      {testArr.map((item) => {
        return <TableRow path={path} key={item} children='ㅁㅁㄴㅇㅁㄴㅇ'/>;
      })}
    </>
  );
};

export default Table;
