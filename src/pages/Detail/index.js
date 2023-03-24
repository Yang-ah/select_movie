import React, { useCallback, useState } from "react";
import { Dropdown } from "../../components";
import { dropdownItems } from "./dropdownitem";
import styles from "./detail.module.scss";

import Comment from "./Comment";

const Detail = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const onClickDropdown = useCallback((item) => {
    return () => {
      setSelectedItem((prev) => (prev?.id === item.id ? null : item));
    };
  }, []);

  const dummy = [
    {
      userName: "hihi",
      comment:
        "너무 재밌어요. 너무 재밌어요.너무 재밌어요.너무 재밌어요.너무 재밌어요.너무 재밌어요.너무 재밌어요.",
      rating: 4,
      date: "2022-03-22",
      children: [
        {
          userName: "byebye",
          comment:
            "전 별로던데용 전 별로던데용 전 별로던데용 전 별로던데용 전 별로던데용",
          date: "2022-03-22",
        },
        {
          userName: "good",
          comment: "전 좋던데용 전 좋던데용 전 좋던데용 전 좋던데용",
          date: "2022-03-22",
        },
      ],
    },
    {
      userName: "hihi2",
      comment:
        "너무 재밌어요. 너무 재밌어요.너무 재밌어요.너무 재밌어요.너무 재밌어요.너무 재밌어요.너무 재밌어요.",
      rating: 3.5,
      date: "2022-03-22",
      children: [
        {
          userName: "byebye2",
          comment:
            "전 별로던데용 전 별로던데용 전 별로던데용 전 별로던데용 전 별로던데용",
          date: "2022-03-22",
        },
        {
          userName: "good2",
          comment: "전 좋던데용 전 좋던데용 전 좋던데용 전 좋던데용",
          date: "2022-03-22",
        },
      ],
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div>상세 페이지</div>
      {dummy.map((commentObj) => {
        return (
          <>
            <Comment
              option="comment"
              key={commentObj.userName + "2"}
              userName={commentObj.userName}
              comment={commentObj.comment}
              date={commentObj.date}
              rating={commentObj.rating}
            />
            {commentObj.children.map((child) => {
              return (
                <Comment
                  key={child.userName + "1"}
                  option="child"
                  comment={child.comment}
                  userName={child.userName}
                  date={child.date}
                />
              );
            })}
          </>
        );
      })}
    </section>
  );
};

export default Detail;
