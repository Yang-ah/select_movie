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
      up: 12,
      down: 1,
      children: [
        {
          userName: "byebye",
          comment:
            "전 별로던데용 전 별로던데용 전 별로던데용 전 별로던데용 전 별로던데용",
          date: "2022-03-22",
          up: 123,
          down: 12,
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
      <h2>type=preview</h2>
      <Comment
        option="preview"
        key={dummy[0].userName + "2"}
        userName={dummy[0].userName}
        comment={dummy[0].comment}
        // date={dummy[0].date} TODO : 넣을지 상의
        rating={dummy[0].rating}
      />
      <h2>type=comment</h2>

      <Comment
        option="comment"
        key={dummy[0].userName + "2"}
        userName={dummy[0].userName}
        comment={dummy[0].comment}
        date={dummy[0].date}
        rating={dummy[0].rating}
        up={dummy[0].up}
        down={dummy[0].down}
      />

      <h2>type=child</h2>
      <Comment
        option="child"
        key={dummy[0].userName + "2"}
        userName={dummy[0].userName}
        comment={dummy[0].comment}
        date={dummy[0].date}
        rating={dummy[0].rating}
        up={dummy[0].up}
        down={dummy[0].down}
      />

      <h2>used map (comment & child)</h2>

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
              up={commentObj.up}
              down={commentObj.down}
            />

            {commentObj.children.map((child) => {
              return (
                <Comment
                  key={child.userName + "1"}
                  option="child"
                  comment={child.comment}
                  userName={child.userName}
                  date={child.date}
                  up={commentObj.up}
                  down={commentObj.down}
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
