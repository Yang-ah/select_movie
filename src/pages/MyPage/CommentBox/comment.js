import React from "react";
import styles from "./commentBox.module.scss";
import { SolidStarIcon, TrashIcon, ModifyIcon } from "../../../assets/icon";

const Pagination = ({
  content,
  createAt,
  score,
  showFixModal,
  showDeleteModal,
}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.screen}>
          <section className={styles.screen}>
            {/* <article className={styles.layerUp}>
              <button className={styles.fixModal} onClick={showFixModal}>
                <ModifyIcon className={styles.icon} height="24px" />
              </button>
              <button className={styles.deleteModal} onClick={showDeleteModal}>
                <TrashIcon className={styles.icon} height="24px" />
              </button>
            </article> */}

            <article className={styles.layerDown}>
              <aside className={styles.top}>
                <div className={styles.left}>
                  <p className={styles.title}>s</p>
                  <p className={styles.createAt}>{createAt}</p>
                </div>
                <div className={styles.score}>
                  <SolidStarIcon className={styles.star} />
                  {score}
                </div>
              </aside>
              <p className={styles.content}>
                {content.length > 200
                  ? content.substring(0, 200) + "..."
                  : content}
              </p>
            </article>
          </section>
        </div>
      </div>
    </>
  );
};

export default Pagination;
