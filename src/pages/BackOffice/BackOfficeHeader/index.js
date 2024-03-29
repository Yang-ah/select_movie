import Button from '../../../components/Common/Button';
import styles from './backOfficeHeader.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CmsModal from '../CMS/cmsModal';
import { AdminLoginPage } from '../CMS/cmsAuth';
import { getMoviesCount } from '../../../api/Movies';
import { getUsersCount } from '../../../api/Users';
import { getReviewsCount } from '../../../api/Reviews';
import {
  AdminLoginModalOpen,
  backOfficeTotalCount,
  isLoginAtom,
} from '../../../state';
import { useRecoilState } from 'recoil';

const BackOfficeHeader = ({ path }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [totalCount, setTotalCount] = useRecoilState(backOfficeTotalCount);
  //NOTE: useState를 사용해도 무방하다.
  const [adminLoginModalOpen, setAdminLoginModalOpen] =
    useRecoilState(AdminLoginModalOpen);
  const [isClick, setIsClick] = useState({
    movies: 'secondary',
    users: 'secondary',
    reviews: 'secondary',
  });

  const showModal = () => {
    setAdminLoginModalOpen(true);
  };

  const responseCount = async () => {
    const response1 = await getMoviesCount();
    const response2 = await getUsersCount();
    const response3 = await getReviewsCount();

    setTotalCount({
      movies: response1.data.count,
      users: response2.data.count,
      reviews: response3.data.count,
    });
  };

  const location = useLocation();
  const moveMovies = () => {
    navigate(`/backoffice/movies`);
  };
  const moveUsers = () => {
    navigate(`/backoffice/users`);
  };
  const moveReviews = () => {
    navigate(`/backoffice/reviews`);
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate(`/auth/admin`);
  };

  useEffect(() => {
    responseCount();
    if (location.pathname === '/backoffice/movies') {
      setIsClick({ movies: 'third', reviews: 'secondary', users: 'secondary' });
    }
    if (location.pathname === '/backoffice/users') {
      setIsClick({ movies: 'secondary', reviews: 'secondary', users: 'third' });
    }
    if (location.pathname === '/backoffice/reviews') {
      setIsClick({ movies: 'secondary', reviews: 'third', users: 'secondary' });
    }
  }, [location]);

  return (
    <>
      <header className={styles.header}>
        <h1>관리자 페이지</h1>
        {!isLogin && <Button onClick={showModal}>관리자 로그인</Button>}
        {isLogin && <Button onClick={logout}>로그아웃</Button>}
        {/* //TODO: 로그인 완료 시 모달 닫기 */}
        <CmsModal
          modalOpen1={adminLoginModalOpen}
          setModalOpen={setAdminLoginModalOpen}
          title="관리자 로그인"
        >
          <AdminLoginPage />
        </CmsModal>
      </header>
      <nav className={styles.nav}>
        <Button
          option={isClick.movies}
          className={styles.button}
          onClick={moveMovies}
        >
          <h3>등록된 영화</h3>
          <h1>
            <span> {totalCount.movies} </span> 개
          </h1>
          <h2>영화관리</h2>
        </Button>

        <Button
          option={isClick.users}
          className={styles.button}
          onClick={moveUsers}
        >
          <h3>전체 이용자</h3>
          <h1>
            <span> {totalCount.users} </span>개
          </h1>
          <h2>회원관리</h2>
        </Button>
        <Button
          option={isClick.reviews}
          className={styles.button}
          onClick={moveReviews}
        >
          <h3>전체 리뷰</h3>
          <h1>
            <span> {totalCount.reviews} </span>개
          </h1>
          <h2>리뷰관리</h2>
        </Button>
      </nav>
    </>
  );
};

export default BackOfficeHeader;
