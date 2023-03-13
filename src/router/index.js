import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../components";
import { HomePage } from "../pages";
//import { LoginPage, RegisterPage } from "../pages/Auth";

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<HomePage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;

