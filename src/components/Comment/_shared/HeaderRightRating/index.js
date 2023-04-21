import { SolidStarIcon } from '../../../../assets/icon';
import styles from './headerRightRating.module.scss';

const HeaderRightRating = ({ rating }) => {
  return (
    <p className={styles.rating}>
      <SolidStarIcon />
      {rating}
    </p>
  );
};

export default HeaderRightRating;
