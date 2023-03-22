import { useState } from "react";
import styles from "./Star.module.scss";
//SolidStarHalfIcon
import { SolidStarIcon, SolidStarHalfIcon } from "../../../assets/icon";


const Star = ({ onClick}) => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);
  const fillStarOfIndex = (num, event) => {
    if (event === "enter" && hoveredStarIndex >= num) {
      return "#ffD400";
    }
    if (event === "leave" && clickedStarIndex >= num) {
      return "#ffD400";
    }
    return "#eeeeee";
  };
  return (
    <div className={styles.starRateContainer}>
      {[1, 2, 3, 4, 5].map((num) => (
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
          {/* <SolidStarIcon
            key={num}
            className={styles.wrapper__star}
            fill={fillStarOfIndex(
              num,
              hoveredStarIndex === 0 ? "leave" : "enter"
            )}
          /> */}
          <SolidStarIcon
            key={num}
            className={styles.wrapper__star}
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

export default Star;