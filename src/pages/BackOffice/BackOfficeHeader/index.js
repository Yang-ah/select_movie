import Button from "../../../components/Common/Button";
import styles from "./backOfficeHeader.module.scss";

const BackOfficeHeader = ({ path }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>관리자 페이지</h1>
        <div className={styles.today}>
          <p>오늘</p>
          <p>
            방문자 <span>8</span>명
          </p>
        </div>
      </header>
      <nav className={styles.nav}>
        <Button option="secondary" className={styles.button}>
          <h3>등록된 영화</h3>
          <h1>
            <span>65 </span>개
          </h1>
          <h2>영화관리</h2>
        </Button>
        <Button option="secondary" className={styles.button}>
          <h3>등록된 리뷰</h3>
          <h1>
            <span>65 </span>개
          </h1>
          <h2>회원관리</h2>
        </Button>
        <Button option="secondary" className={styles.button}>
          <h3>전체 리뷰</h3>
          <h1>
            <span>65 </span>개
          </h1>
          <h2>리뷰관리</h2>
        </Button>
      </nav>
    </>
  );
};

export default BackOfficeHeader;
