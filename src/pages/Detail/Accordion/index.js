import React, { useState } from "react";
import styles from "./accordion.module.scss";
import { ChevronUp, ChevronDown } from "../../../assets/icon";
import Comment from "../../../components/Comment";
import cx from "classnames";

// review:리뷰(object), childArr:리뷰에 달린 댓글들[]
// TODO : 애니메이션 추가, 리뷰버튼 수정
// chevron은 down만 사용해서 애니메이션
const Accordion = ({ review, childArr }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <li className={cx(styles.accordionItem, styles.noChild)}>
      <Comment
        type="comment"
        key={""}
        userName={""}
        comment={""}
        date={""}
        rating={""}
      />
      {/* 댓글이 없는 리뷰는 ⬆comment만 리턴 */}

      {childArr && (
        <>
          <button
            className={styles.button}
            onClick={() => setClicked(!clicked)}
          >
            댓글
            {clicked ? <ChevronUp /> : <ChevronDown />}
          </button>

          {clicked && (
            <div className={styles.recomment}>
              {childArr.map((child) => {
                return (
                  <Comment
                    type="child"
                    key={""}
                    comment={""}
                    userName={""}
                    date={""}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default Accordion;
