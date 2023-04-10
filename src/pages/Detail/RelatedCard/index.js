import { BookmarkIcon, HeartIcon } from '../../../assets/icon';
import styles from './relatedCard.module.scss';

const RelatedCard = ({ title, id, postImage, onClick }) => {
  return (
    <article className={styles.cardWrap} onClick={onClick}>
      <img src={postImage} alt={title} />
      <div className={styles.overlay}>
        <h3>{title}</h3>
      </div>
    </article>
  );
};

export default RelatedCard;
