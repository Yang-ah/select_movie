import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";


const Layout = () => {
  return (
    <div >
      <main>
        <Header />
        <section >
          <Outlet />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;