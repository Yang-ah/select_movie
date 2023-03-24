import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

import styles from "./layout.module.scss";

const Layout = () => {
  return (
    <div>
      <main className={styles.wrap}>
        <Header />
        <section>
          <Outlet />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
