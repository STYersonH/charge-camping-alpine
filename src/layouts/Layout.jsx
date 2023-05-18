import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
//import { useStateValue } from "./context/StateProvider";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getClientsForCobrador } from "../utils/firebaseFunctions";

const Layout = () => {
  const [{ user, clientsForCobrador }, reducer] = useStateValue();

  const obtenerClients = async () => {
    var clientitos = await getClientsForCobrador(user.uid);
    const mappedClients = clientitos.map((cliente) => cliente.name);
    console.log("clientitos desde Register: ", clientitos);
    reducer({
      type: actionType.SET_CLIENTS_FOR_COBRADOR,
      clients: clientitos,
    });
  };

  useEffect(() => {
    obtenerClients();
  }, [user]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
