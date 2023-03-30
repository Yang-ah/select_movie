import React, { useState } from "react";
import styles from "./accordion.module.scss";
import data from "../../../mock_comment.json";
import { ChevronUp, ChevronDown } from "../../../assets/icon";
import Comment from "../../../components/Comment";
import cx from "classnames";

const FakeAccordion = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <li className={cx(styles.accordionItem)}>
      {data.map((commentObj, id) => (
        <li className={styles.comment}>
          <Comment
            type="comment"
            key={commentObj.userName + "2"}
            userName={commentObj.userName}
            comment={commentObj.comment}
            date={commentObj.date}
            rating={commentObj.rating}
          />
          <button
            className={styles.button}
            onClick={() => setClicked(!clicked)}
          >
            {"리뷰"}
            {clicked ? <ChevronUp /> : <ChevronDown />}
          </button>

          {clicked && (
            <div className={styles.recomment}>
              {commentObj.children.map((child) => {
                return (
                  <Comment
                    type="child"
                    key={child.userName + "1"}
                    comment={child.comment}
                    userName={child.userName}
                    date={child.date}
                  />
                );
              })}
            </div>
          )}
        </li>
      ))}
    </li>
  );
};

export default FakeAccordion;
