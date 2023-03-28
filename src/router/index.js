import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../components";
import { DetailPage, HomePage, MyPage, SearchPage, BOPage, TestPage } from "../pages";
import { LoginPage, RegisterPage } from "../pages/Auth";
import Preview from "../pages/Preview";

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="detail" element={<DetailPage />} />
    <Route path="preview" element={<Preview />} />
    <Route path="my" element={<MyPage />} />
    <Route path="auth">
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
    <Route path="search" element={<SearchPage />} />
    <Route path="bo" element={<BOPage />} />
    <Route path="test" element={<TestPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
