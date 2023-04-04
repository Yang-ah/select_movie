import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

import styles from "./layout.module.scss";
import { useEffect } from "react";

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
