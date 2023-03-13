import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { HomePage } from "../pages";
//import { LoginPage, RegisterPage } from "../pages/Auth";

const route = (
  <Route path="/">
    <Route index element={<HomePage />} />
    {/* <Route path="auth">
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route> */}
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;

