import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./layouts/layout";
import Clients from "./pages/Clients";
import RegisterClient from "./pages/RegisterClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Clients />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Register />,
  },
  {
    path: "/agregar-cliente",
    element: <RegisterClient />,
  },
]);

export default router;
