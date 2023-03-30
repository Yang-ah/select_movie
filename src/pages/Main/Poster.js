import React from "react";
import styles from "./poster.module.scss"

const Poster = ({movie , onModalClick , onOver}) => {

  const { id,postImage,title } = movie;


  return (
    <div className={styles.wrapper}>
      <div className={styles.box} >
        <div className={styles.card} onClick={onModalClick} onMouseOver={()=>onOver(id)}>
          <img className={styles.media} src={postImage} alt={title} />
        </div>
      </div>
    </div>
  );
}


export default Poster;
