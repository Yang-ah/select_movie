import { useState } from "react";
import styles from "./Star.module.scss";
//import { ReactComponent as Star } from "./star.svg";
import { SolidStarIcon } from "../../../assets/icon";


const Star = ({ onClick}) => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);
  const fillStarOfIndex = (num, event) => {
    if (event === "enter" && hoveredStarIndex >= num) {
      return "#ff7f23";
    }
    if (event === "leave" && clickedStarIndex >= num) {
      return "#ff7f23";
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