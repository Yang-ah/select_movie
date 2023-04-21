import React from 'react';
import styles from './footer.module.scss';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';

const Footer = () => {
  const location = useLocation();
  const needFixed =
    location.pathname === '/my' || location.pathname.includes('/user');

  return (
    <footer className={cx(styles.wrap, { [styles.fixed]: needFixed })}>
      <div className={styles.left}>
        <p className={styles.logo}>무비셀렉터</p>
        <p>1팀 : 이인국, 주양아, 신현중, 구성미</p>
      </div>
      <div className={styles.right}>
        <p>codestates @2023 cooperation</p>
        <a
          href="https://github.com/Yang-ah/select_movie.git"
          target={'_blank'}
          rel="noreferrer"
        >
          https://github.com/Yang-ah/select_movie.git
        </a>
      </div>
    </footer>
  );
};

export default Footer;
