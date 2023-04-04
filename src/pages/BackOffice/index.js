import styles from "./backOffice.module.scss";
import BackOfficeHeader from "./BackOfficeHeader";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BackOfficeMovies from "./BackOfficeBody/movies";
import BackOfficeUsers from "./BackOfficeBody/users";
import BackOfficeReviews from "./BackOfficeBody/reviews";

//NOTE: /backoffice?type=movies
const BackOffice = () => {
  const location = useLocation();
  const [path, setPath] = useState("movies");

  useEffect(() => {
    if (location.pathname === "/backoffice/movies") {
      setPath("movies");
    }
    if (location.pathname === "/backoffice/users") {
      setPath("users");
    }
    if (location.pathname === "/backoffice/reviews") {
      setPath("reviews");
    }
  }, [location]);

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <BackOfficeHeader path={path} />
        <main className={styles.main}>
        {/* <Table path={path} /> */}
        {path==='movies' && <BackOfficeMovies/>}
        {path==='users' && <BackOfficeUsers/>}
        {path==='reviews' && <BackOfficeReviews/>}
        </main>
      </div>
    </section>
  );
};

export default BackOffice;
