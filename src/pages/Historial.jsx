import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getHistorialByCliente } from "../utils/firebaseFunctions";
import Header from "../components/Header";
import AgregarHistorial from "../components/AgregarHistorial";
import { useNavigate } from "react-router-dom";
import BotonGoClient from "../components/BotonGoClient";

const Historial = () => {
  const navigate = useNavigate();
  const [{ clientActual }] = useStateValue();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const historialData = await getHistorialByCliente(clientActual.dni);
        setHistorial(historialData);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerHistorial();
  }, [clientActual.dni]);

  return (
    <div className="">
      <Header />
      <div className="flex justify-around">
        <p>Tipo</p>
        <p>Monto</p>
        <p>Fecha</p>
        <p>Saldo</p>
      </div>
      <div className="border-2 "></div>
      {historial?.map((hist, id) => (
        <div key={id}>
          <AgregarHistorial historial={hist} />
        </div>
      ))}

      {/* Regresar a la pagina principal del cliente */}
      <BotonGoClient />
    </div>
  );
};

export default Historial;
