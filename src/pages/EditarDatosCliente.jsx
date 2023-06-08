import React, { createRef, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  agregarMochila,
  getClient,
  updateClient,
} from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { centrosComerciales } from "../data/centrosComerciales";
import { ciudades } from "../data/ciudades";

import HeaderConBoton from "../components/HeaderConBoton";

const EditarDatosCliente = () => {
  // Obtener regerencias
  const clientNameRef = createRef();
  const clientNumberRef = createRef();
  const clientCiudadRef = createRef();
  const clientCentroComercialRef = createRef();

  const navigate = useNavigate();
  const [{ clientActual }, reducer] = useStateValue();
  const [ciudadElegida, setCiudadElegida] = useState(ciudades[0]);

  const handleAddingClient = async (e) => {
    //prevenir la accion de enviar el formulario
    e.preventDefault();

    const nameClient = clientNameRef.current.value;
    const numberClient = clientNumberRef.current.value;
    const ciudadClient = clientCiudadRef.current.value;
    const centroComercialClient = clientCentroComercialRef.current.value;

    //crear objeto cliente
    const clienteDatos = {
      name: nameClient,
      celular: numberClient,
      ciudad: ciudadClient,
      centroComercial: centroComercialClient,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    };

    await updateClient(clienteDatos, clientActual.dni);
    const clienteActualizado = await getClient(clientActual.dni);

    console.log("llega hasta aqui");
    reducer({
      type: actionType.SET_CLIENT_IN_USE,
      clientActual: clienteActualizado,
    });

    navigate(`/${clientActual.username}/info`);
  };

  return (
    <div className="flex flex-col justify-center">
      <HeaderConBoton link2regresar={`${clientActual.username}/info`} />
      <h1 className="text-3xl text-center mt-5">Editar datos del cliente</h1>
      <div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
      <div className="flex flex-col items-center">
        <form className="my-container " onSubmit={handleAddingClient}>
          <div className="m-3">
            <label htmlFor="" className="pb-2">
              Nombre:
            </label>
            <input
              type="text"
              placeholder="ingresar nombre del cliente"
              className="border-2 p-2 w-full rounded-2xl"
              ref={clientNameRef}
              defaultValue={clientActual.name}
            />
          </div>

          <div className="m-3">
            <label htmlFor="" className="pb-2">
              Numero de celular:
            </label>
            <input
              type="number"
              placeholder="ingresar numero de celuar"
              className="border-2 p-2 w-full rounded-2xl"
              ref={clientNumberRef}
              defaultValue={clientActual.celular}
            />
          </div>

          <div className="flex mt-5">
            <div className="mx-3">
              <label htmlFor="" className="pb-2 mr-4">
                Ciudad:
              </label>

              <select
                name="Ciudad de ubicacion"
                id="opcion"
                className="bg-white border-2 p-2 rounded-2xl w-full"
                ref={clientCiudadRef}
                defaultValue={clientActual.ciudad}
              >
                {ciudades.map((ciudad) => (
                  <option
                    onClick={() => {
                      setCiudadElegida(ciudad);
                    }}
                    key={ciudad.id}
                    value={ciudad.ciudad}
                  >
                    {ciudad.ciudad}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-3 ">
              <label htmlFor="" className="pb-2 mr-4">
                Centro comercial:
              </label>

              <select
                name="Ciudad de ubicacion"
                id="opcion"
                className="bg-white border-2 p-2 rounded-2xl  w-full"
                ref={clientCentroComercialRef}
                defaultValue={clientActual.centroComercial}
              >
                {
                  //filtrar los centros comerciales con el id de la ciudad elegida
                  centrosComerciales
                    .filter(
                      (centroComercial) =>
                        centroComercial.idCiudad === ciudadElegida.id
                    )
                    .map((centroComercial) => (
                      <option
                        key={centroComercial.id}
                        value={centroComercial.centroComercial}
                      >
                        {centroComercial.centroComercial}
                      </option>
                    ))
                }
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <input
              type="submit"
              value="Guardar cambios"
              className="text-white border-white bg-blue-400 hover:bg-blue-500 rounded-3xl py-2.5 px-20 my-10 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarDatosCliente;
