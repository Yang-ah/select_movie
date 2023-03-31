import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import rootRouter from "./router";

import "./styles/global.scss";
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from 'recoil';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <RouterProvider router={rootRouter} />
    </React.StrictMode>
  </RecoilRoot>
);

reportWebVitals();
