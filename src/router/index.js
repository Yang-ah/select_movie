import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
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

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="detail/:id" element={<DetailPage />} />
    <Route path="main" element={<Main />} />
    <Route path="my" element={<MyPage />} />
    <Route path="test" element={<TestPage />} />
    <Route path="auth">
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
    <Route path="search" element={<SearchPage />} />
    <Route path="backoffice/:id" element={<BackOfficePage />} />
    <Route path="test" element={<TestPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
