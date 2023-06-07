import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getHistorialByCliente } from "../utils/firebaseFunctions";
import Header from "../components/Header";
import AgregarHistorial from "../components/AgregarHistorial";
import { useNavigate } from "react-router-dom";
import HeaderConBoton from "../components/HeaderConBoton";

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
      <HeaderConBoton link2regresar={clientActual.username} />
      <div className="flex justify-around mt-10">
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
    </div>
  );
};

export default Historial;
