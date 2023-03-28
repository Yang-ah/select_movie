import styles from "./headerRightRating.module.scss";
import { SolidStarIcon } from "../../../../assets/icon";

export const HeaderRightRating = ({ rating }) => {
  return (
    <p className={styles.rating}>
      <SolidStarIcon />
      {rating}
    </p>
  );
};

export default HeaderRightRating;
