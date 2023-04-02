import { useState } from "react";
import styles from "./stars.module.scss";
import { SolidStarHalfIcon } from "../../../assets/icon";
import cx from "classnames";

const Stars = ({ onChange, className }) => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);

  const fillStarOfIndex = (num, event) => {
    if (event === "enter" && hoveredStarIndex >= num) {
      return "#ff9900";
    }
    if (event === "leave" && clickedStarIndex >= num) {
      return "#ff9900";
    }
    return "#eeeeee";
  };

  const onClickStar = (num) => {
    return () => {
      setClickedStarIndex(num);
      onChange((prev) => {
        return { ...prev, ["score"]: num / 2 };
      });
    };
  };

  return (
    <div className={cx(styles.starRateContainer, className)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <button
          key={num}
          type="button"
          className={cx(styles.wrapper, num % 2 || styles.right)}
          onMouseEnter={() => setHoveredStarIndex(num)}
          onMouseLeave={() => setHoveredStarIndex(0)}
          onClick={onClickStar(num)}
        >
          <SolidStarHalfIcon
            className={styles.star}
            key={num}
            fill={fillStarOfIndex(
              num,
              hoveredStarIndex === 0 ? "leave" : "enter"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default Stars;
