import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./context/StateProvider.jsx";

import { initialState } from "./context/initialState.jsx";
import reducer from "./context/reducer.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </StateProvider>
  </React.StrictMode>
);
