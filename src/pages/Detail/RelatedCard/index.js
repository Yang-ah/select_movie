import { BookmarkIcon, HeartIcon } from '../../../assets/icon';
import styles from './relatedCard.module.scss';

const RelatedCard = ({ title, id, postImage, onClick }) => {
  return (
    <div className={styles.cardWrap} onClick={onClick}>
      <img src={postImage} alt={title} />
      <div className={styles.overlay}>
        <h3>
          <div className={styles.leftWrap}>
            <button>
              <HeartIcon />
            </button>
            {title}
          </div>
          <button>
            <BookmarkIcon />
          </button>
        </h3>
      </div>
    </div>
  );
};

export default RelatedCard;
