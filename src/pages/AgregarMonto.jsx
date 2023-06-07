import React, { createRef, useState } from "react";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";
import {
  actualizarMonto,
  agregarHistorial,
  getClient,
} from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import HeaderConBoton from "../components/HeaderConBoton";

const AgregarMonto = () => {
  const navigate = useNavigate();
  const [{ clientActual, mochilas }, reducer] = useStateValue();
  const [modeloSeleccionado, setModeloSeleccionado] = useState(mochilas[0]);
  const [cantidadMochilas, setCantidadMochilas] = useState(0);

  // Obtener regerencias
  const modeloMochilaRef = createRef();
  const cantidadRef = createRef();

  console.log("saldo: ", clientActual.saldo);

  const handleRegistrarMonto = async (e) => {
    e.preventDefault();
    const datosAgregarMonto = {
      idCliente: clientActual.dni,
      saldo:
        parseFloat(clientActual.saldo) +
        cantidadMochilas * modeloSeleccionado.price,
      tipoAccion: "agregar",
      cantidad: cantidadMochilas,
      modelo: modeloMochilaRef.current.value,
      //monto: parseFloat(totalRef.current.value),
      monto: cantidadMochilas * modeloSeleccionado.price,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    };

    await agregarHistorial(datosAgregarMonto);
    await actualizarMonto(datosAgregarMonto.saldo, clientActual.dni);

    //const client = await getClient(clientActual.dni);

    // await reducer({
    //   type: actionType.SET_CLIENT_IN_USE,
    //   clientActual: client,
    // });

    navigate(`/${clientActual.userame}`);
  };

  return (
    <div className="flex flex-col justify-center">
      <HeaderConBoton link2regresar={clientActual.username} />
      <h1 className="text-3xl text-center mt-5">Agregar monto</h1>
      <div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
      <div className="flex flex-col items-center">
        <form className="my-container " onSubmit={handleRegistrarMonto}>
          {/* Reemplazar a lo de arriba */}
          <div className="mx-3 ">
            <label htmlFor="" className="pb-2 mr-4">
              Elegir modelo de producto:
            </label>

            <select
              name="Ciudad de ubicacion"
              id="opcion"
              className="bg-white text-black border-2 p-2 rounded-2xl  w-full"
              ref={modeloMochilaRef}
            >
              {mochilas?.map((mochila) => (
                <option
                  onClick={() => {
                    setModeloSeleccionado(mochila);
                  }}
                  value={mochila.model}
                  key={mochila.model}
                >
                  {mochila.model}
                </option>
              ))}

              {/* <option value="Bombonera">Bombonera</option>
                <option value="Confraternidad">Confraternidad</option>
                <option value="Paraiso">Paraiso</option>
                <option value="Molino">Molino</option> */}
            </select>
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
              onChange={() => {
                console.log("cambio : ", cantidadRef.current?.value);
                setCantidadMochilas(cantidadRef.current?.value);
              }}
            />
          </div>

          {/* calculable */}

          <div className="m-3 mt-10 flex text-center justify-center text-xl">
            <div>Total&nbsp;&nbsp;</div>
            <div className="font-bold">
              s/.{cantidadMochilas * modeloSeleccionado.price}
            </div>
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
    </div>
  );
};

export default AgregarMonto;
