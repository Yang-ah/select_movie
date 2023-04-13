import { Link, useNavigate } from 'react-router-dom';
import styles from './searchCard.module.scss';
import { SolidStarIcon } from '../../../assets/icon';

const SearchCard = ({ movieId, title, averageScore = 0, postImage }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <article className={styles.wrap} onClick={onClick}>
      <img className={styles.postImage} src={postImage} alt={title} />
      <div className={styles.overlay}>
        <span className={styles.score}>
          <SolidStarIcon />
          {averageScore?.toFixed(1)}
        </span>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </article>
  );
};

export default SearchCard;
