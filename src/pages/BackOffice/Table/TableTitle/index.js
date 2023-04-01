import cx from "classnames";
import styles from "./tableTitle.module.scss";

const EachHeader = {
  users: ["가입일", "생년월일", "닉네임", "성별", "수정", "탈퇴"],
  movies: ['영화제목',"개봉일", "평균평점", "좋아요", "수정"],
  reviews: ["작성일", "작성자", "영화", "작성내용", "신고", "더보기"],
};

const TableTitle = ({ path }) => {
  return (
    <ul className={cx(styles.wrap, { [styles.reviews]: path === "reviews" })}>
      <li>선택</li>
      {EachHeader[path].map((item, index) => {
        return <li key={"review" + index}>{item}</li>;
      })}
    </ul>
  );
};

export default TableTitle;
