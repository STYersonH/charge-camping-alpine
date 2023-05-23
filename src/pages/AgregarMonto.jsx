import React, { createRef } from "react";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";
import {
  actualizarMonto,
  agregarHistorial,
  getClient,
} from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import BotonGoClient from "../components/BotonGoClient";

const AgregarMonto = () => {
  const navigate = useNavigate();
  const [{ clientActual }, reducer] = useStateValue();

  // Obtener regerencias
  const modeloMochilaRef = createRef();
  const cantidadRef = createRef();
  const totalRef = createRef();

  console.log("saldo: ", clientActual.saldo);

  const handleRegistrarMonto = async (e) => {
    e.preventDefault();
    const datosAgregarMonto = {
      idCliente: clientActual.dni,
      saldo:
        parseFloat(clientActual.saldo) + parseFloat(totalRef.current.value),
      tipoAccion: "agregar",
      cantidad: cantidadRef.current.value,
      modelo: modeloMochilaRef.current.value,
      monto: parseFloat(totalRef.current.value),
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    };

    await agregarHistorial(datosAgregarMonto);
    //await actualizarMonto(datosAgregarMonto.saldo, clientActual.dni);

    //const client = await getClient(clientActual.dni);

    // await reducer({
    //   type: actionType.SET_CLIENT_IN_USE,
    //   clientActual: client,
    // });

    navigate(`/${clientActual.userame}`);
  };

  return (
    <div className="flex flex-col justify-center">
      <Header />
      <h1 className="text-3xl text-center mt-5">Agregar monto</h1>
      <div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
      <div className="flex flex-col items-center">
        <form className="my-container " onSubmit={handleRegistrarMonto}>
          <div className="m-3">
            <label htmlFor="" className="pb-2">
              Modelo Mochila:
            </label>
            <input
              type="text"
              placeholder="ingresar modelo de mochila"
              className="border-2 p-2 w-full rounded-2xl"
              ref={modeloMochilaRef}
            />
          </div>

          <div className="m-3">
            <label htmlFor="" className="pb-2">
              Cantidad:
            </label>
            <input
              type="number"
              placeholder="ingresar cantidad de mochilas"
              className="border-2 p-2 w-full rounded-2xl"
              ref={cantidadRef}
            />
          </div>

          {/* calculable */}
          <div className="m-3">
            <label htmlFor="" className="pb-2">
              Total:
            </label>
            <input
              type="number"
              placeholder="total"
              className="border-2 p-2 w-full rounded-2xl"
              ref={totalRef}
            />
          </div>

          <div className="w-full flex justify-center">
            <input
              type="submit"
              value="Agregar monto"
              className="text-white border-white bg-blue-400 hover:bg-blue-500 rounded-3xl py-2.5 px-20 my-10 cursor-pointer"
            />
          </div>
        </form>
      </div>

      {/* Regresar a la pagina principal del cliente */}
      <BotonGoClient />
    </div>
  );
};

export default AgregarMonto;
