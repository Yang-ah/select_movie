import { Outlet, useLocation } from 'react-router-dom';

import styles from './layout.module.scss';
import { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className={styles.wrap}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
