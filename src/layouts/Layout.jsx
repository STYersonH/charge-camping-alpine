import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//import { useStateValue } from "./context/StateProvider";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getClientsForCobrador, getmochilas } from "../utils/firebaseFunctions";

const Layout = () => {
  const [{ user, productos }, reducer] = useStateValue();
  const navigate = useNavigate();

  const obtenerClients = async () => {
    var clientitos = await getClientsForCobrador(user.uid);
    const mappedClients = clientitos.map((cliente) => cliente.name);
    console.log("clientitos desde Register: ", clientitos);
    reducer({
      type: actionType.SET_CLIENTS_FOR_COBRADOR,
      clients: clientitos,
    });
  };

  const obtenerProductos = async () => {
    var productos = await getmochilas();
    reducer({
      type: actionType.SET_MOCHILAS,
      mochilas: productos,
    });
  };

  useEffect(() => {
    obtenerClients();
    obtenerProductos();
  }, [user]);
  return (
    <>
      <Header />
      {/* agregando seccion para ver productos */}
      <section className="h-[100px] mb-10 bg-blue-600 flex items-center justify-center">
        <div
          className="my-container my-1 py-2 border-2 bg-white  hover:bg-gray-200 text-blue-600 rounded-xl text-xl text-center cursor-pointer"
          onClick={() => navigate("/productos")}
        >
          Mis productos
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default Layout;
