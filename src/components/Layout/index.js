import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
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
