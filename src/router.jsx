import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./layouts/layout";
import Clients from "./pages/Clients";
import RegisterClient from "./pages/RegisterClient";
import ClientMain from "./pages/ClientMain";
import AgregarMonto from "./pages/AgregarMonto";

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
  {
    path: "/:usernameCliente",
    element: <ClientMain />,
  },
  {
    path: "/:usernameCliente/agregar-monto",
    element: <AgregarMonto />,
  },
]);

export default router;
