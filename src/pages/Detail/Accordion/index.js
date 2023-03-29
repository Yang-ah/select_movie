import React, { useState } from "react";
import styles from "./accordion.module.scss";
import data from "../../../mock_comment.json";
import { ChevronUp, ChevronDown } from "../../../assets/icon";
import Comment from "../../../components/Comment";

// review:리뷰(object), childArr:리뷰에 달린 댓글들[]
const Accordion = ({ review, childArr }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <li className={styles.accordionItem}>
      <Comment
        type="comment"
        key={""}
        userName={""}
        comment={""}
        date={""}
        rating={""}
      />

      {childArr && (
        <button className={styles.button} onClick={() => setClicked(!clicked)}>
          리뷰
          {clicked ? <ChevronUp /> : <ChevronDown />}
        </button>
      )}

      {childArr && clicked && (
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
    </li>
  );
};

export default Accordion;
