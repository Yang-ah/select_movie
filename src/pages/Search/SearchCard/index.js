import { Link, useNavigate } from 'react-router-dom';
import styles from './searchCard.module.scss';

const SearchCard = ({ movieId, title, averageScore, isLiked, postImage }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <article className={styles.wrap} onClick={onClick}>
      <img className={styles.postImage} src={postImage} alt={title} />
      <div className={styles.overlay}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </article>
  );
};

export default SearchCard;
