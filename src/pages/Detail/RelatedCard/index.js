import { useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon, HeartIcon } from "../../../assets/icon";
import styles from "./relatedCard.module.scss";

const RelatedCard = ({ title, id, postImage, onClick }) => {
  /*  
 TODO:연관영화에도 좋아요, 북마크할수있도록 만들기
  const [isMyState, setMyState] = useState({
    isLiked: false,
    isBookmarked: false,
  });

      onClick={() => {
        return navigate(`/detail/${id}`);
      }}
 
  */

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
