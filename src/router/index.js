import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  DetailPage,
  HomePage,
  MyPage,
  SearchPage,
  BackOfficePage,
  UserPage,
  LoginPage,
  RegisterPage,
} from '../pages';
import { Layout } from '../components';

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="detail/:id" element={<DetailPage />} />
    <Route path="my" element={<MyPage />} />
    <Route path="user/:id" element={<UserPage />} />
    <Route path="auth">
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
    <Route path="search/:keyword" element={<SearchPage />} />
    <Route path="backoffice/:id" element={<BackOfficePage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
