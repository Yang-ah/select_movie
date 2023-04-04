import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { Layout } from "../components";
import {
  DetailPage,
  HomePage,
  MyPage,
  SearchPage,
  BackOfficePage,
  TestPage,
} from "../pages";
import { LoginPage, RegisterPage } from "../pages/Auth";
import Main from "../pages/Main";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Q : 페이지 이동할 때 스크롤 맨 위로 올리려고 시도 중인데, 잘 안됩니다....
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const route = (
  <>
    {/*<ScrollRestoration />*/}
    <Route element={<ScrollToTop />} />
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="detail/:id" element={<DetailPage />} />
      <Route path="main" element={<Main />} />
      <Route path="my" element={<MyPage />} />
      <Route path="auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="search" element={<SearchPage />} />
      <Route path="backoffice/:id" element={<BackOfficePage />} />
      <Route path="test" element={<TestPage />} />
    </Route>
  </>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
