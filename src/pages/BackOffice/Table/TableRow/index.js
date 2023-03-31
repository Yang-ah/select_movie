import styles from "./tableRow.module.scss";
import cx from "classnames";
import CheckBox from "../../CheckBox";
import Button from "../../../../components/Common/Button";

// path별로 오브젝트 만들어서 mapping
const TableRow = ({ path }) => {
  return (
    <>
      {path === "users" && (
        <ul className={cx(styles.wrap)}>
          <li className={styles.checkbox}>
            <CheckBox onClick={() => {}} />
          </li>
          <li>2022.04.01</li>
          <li>2022.04.01</li>
          <li>닉네임이뭘까요오</li>
          <li>여</li>
          <li>
            <Button children="수정" />
          </li>
          <li>
            <Button children="탈퇴" />
          </li>
        </ul>
      )}

      {path === "movies" && (
        <ul className={cx(styles.wrap)}>
          <li className={styles.checkbox}>
            <CheckBox onClick={() => {}} />
          </li>
          <li>2022.04.01</li>
          <li>로맨스, 스릴러, 공포</li>
          <li>라라랜드</li>
          <li>⭐️4.5</li>
          <li>💝20</li>
          <li>
            <Button children="수정" />
          </li>
        </ul>
      )}

      {path === "reviews" && (
        <ul className={cx(styles.wrap, styles.review)}>
          <li className={styles.checkbox}>
            <CheckBox onClick={() => {}} />
          </li>
          <li>2022.04.01</li>
          <li>닉네임이뭘까나</li>
          <li>라라랜드</li>
          <li>
            라라랜드는 너무나 너무나 너무나 너무나 너무나 너무나 너무나 너무나
            너무나 너무나 너무나 너무나 너무나 너무나 너무나 너무나 너무나
            인생영화입니다~
          </li>
          <li>0</li>
          <li>
            <Button children="더보기" />
          </li>
          <li>
            <Button children="삭제" />
          </li>
        </ul>
      )}
    </>
  );
};

export default TableRow;
