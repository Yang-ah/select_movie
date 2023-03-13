import React from "react";
import ReactDOM from "react-dom/client";
import rootRouter from "./router";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={rootRouter} />
  </React.StrictMode>
);

reportWebVitals();
