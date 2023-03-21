import { useState } from "react";
import styles from "./stars.module.scss";
import { SolidStarHalfIcon } from "../../../assets/icon";
import cx from "classnames";

const Stars = ({ onClick }) => {
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
  return (
    <div className={styles.starRateContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
          onMouseEnter={() => setHoveredStarIndex(num)}
          onMouseLeave={() => setHoveredStarIndex(0)}
          onClick={() => {
            setClickedStarIndex(num);
            onClick?.();
          }}
        >
          <SolidStarHalfIcon
            key={num}
            className={cx(styles.star, num % 2 || styles.right)}
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
