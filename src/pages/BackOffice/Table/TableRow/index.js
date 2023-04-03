import styles from "./tableRow.module.scss";
import cx from "classnames";
import CheckBox from "../../CheckBox";
import Button from "../../../../components/Common/Button";

const TableRow = ({ path, children, onChange }) => {
  return (
    <>
      <ul className={cx(styles.wrap, 
        { [styles.users]: path === "users" },
        { [styles.reviews]: path === "reviews" })}>
        <li className={styles.checkbox}>
          <CheckBox onChange={onChange} />
        </li>

        {/* children */}
        {children}

        {/* users buttons */}
        {path === "users" && (
          <>
            <li>
              <Button children="수정" />
            </li>
            <li>
              <Button children="탈퇴" />
            </li>
          </>
        )}

        {/* movies buttons */}
        {path === "movies" && (
          <li>
            <Button children="수정" />
          </li>
        )}

        {/* reviews buttons */}
        {path === "reviews" && (
          <>
            <li>
              <Button children="더보기" />
            </li>
            <li>
              <Button children="삭제" />
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default TableRow;
