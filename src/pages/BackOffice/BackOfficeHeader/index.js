import Button from "../../../components/Common/Button";
import styles from "./backOfficeHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import  CmsModal  from '../CMS/cmsModal';

const BackOfficeHeader = ({ path }) => {
  const navigate = useNavigate();
  const moveMovies = () => { navigate(`/backoffice/movies`); };
  const moveUsers = () => { navigate(`/backoffice/users`); };
  const moveReviews = () => { navigate(`/backoffice/reviews`); };
  
   // 모달창 노출 여부 state
   const [modalOpen, setModalOpen] = useState(false);
   // 모달창 노출
   const showModal = () => { setModalOpen(true); };

  return (
    <>
      <header className={styles.header}>
        <h1 onClick={showModal}>관리자 페이지</h1>
        <CmsModal
            modalOpen1={modalOpen}
            setModalOpen={setModalOpen}
            children='1' 
            buttonChildren='2' />
        <div className={styles.today}>
          <p>오늘</p>
          <p>
            방문자 <span>8</span>명
          </p>
        </div>
      </header>
      <nav className={styles.nav}>
        
        <Button option="secondary" className={styles.button}
        onClick={moveMovies}>
          <h3>등록된 영화</h3>
          <h1>
            <span>65 </span>개
          </h1>
          <h2>영화관리</h2>
        </Button>
    
        <Button option="secondary" className={styles.button}
        onClick={moveUsers}>
          <h3>등록된 리뷰</h3>
          <h1>
            <span>65 </span>개
          </h1>
          <h2>회원관리</h2>
        </Button>
        <Button option="secondary" className={styles.button}
        onClick={moveReviews}>
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
