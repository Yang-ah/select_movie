import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import styles from "./layout.module.scss";

const Layout = () => {
  return (
    <main className={styles.wrapper}>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default Layout;
