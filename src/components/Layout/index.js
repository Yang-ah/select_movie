import { Outlet } from "react-router-dom";
import Header from "./header";


const Layout = () => {
  return (
    <div >
      <main>
        <Header />
        <section >
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;