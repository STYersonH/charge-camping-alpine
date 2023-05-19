import React, { createRef } from "react";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";
import { saveClient, createHistorialClient } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const RegisterClient = () => {
  // Obtener regerencias
  const clientNameRef = createRef();
  const clientNumberRef = createRef();
  const clientDNIRef = createRef();
  const clientCiudadRef = createRef();
  const clientCentroComercialRef = createRef();

  const navigate = useNavigate();
  const [{ user, clientsForCobrador }, reducer] = useStateValue();

  console.log(clientsForCobrador);
  const handleAddingClient = (e) => {
    //prevenir la accion de enviar el formulario
    e.preventDefault();

    const nameClient = clientNameRef.current.value;
    const numberClient = clientNumberRef.current.value;
    const DNIClient = clientDNIRef.current.value;
    const ciudadClient = clientCiudadRef.current.value;
    const centroComercialClient = clientCentroComercialRef.current.value;
    const usernameClient = slugify(nameClient, { lower: true });
    console.log("id del user: ", user.uid);
    //crear objeto cliente
    const clienteDatos = {
      idCobrador: user.uid,
      name: nameClient,
      username: usernameClient,
      celular: numberClient,
      dni: DNIClient,
      ciudad: ciudadClient,
      centroComercial: centroComercialClient,
      saldo: 0,
    };
    createHistorialClient(clienteDatos.dni);
    saveClient(clienteDatos);
    console.log("cliente datos:", clienteDatos.name);

    //use set functions
    if (clientsForCobrador) {
      reducer({
        type: actionType.SET_CLIENTS_FOR_COBRADOR,
        //clients: [...clientsForCobrador, clienteDatos.name],
        clients: [...clientsForCobrador, clienteDatos],
      });
    } else {
      reducer({
        type: actionType.SET_CLIENTS_FOR_COBRADOR,
        clients: [clienteDatos.name],
      });
    }
    console.log("clientes: ", clientsForCobrador);

    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center">
      <Header />
      <h1 className="text-3xl text-center mt-5">Clientes</h1>
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
            />
          </div>
          {/* Falta restringir que tenga 8 digitos obligatoriamente */}
          <div className="m-3">
            <label htmlFor="" className="pb-2">
              DNI:
            </label>
            <input
              type="text"
              placeholder="ingresar DNI"
              className="border-2 p-2 w-full rounded-2xl"
              ref={clientDNIRef}
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
              >
                <option value="Sicuani">Sicuani</option>
                <option value="Cusco">Cusco</option>
                <option value="Espinar">Espinar</option>
                <option value="Quillabamba">Quillabamba</option>
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
              >
                <option value="Bombonera">Bombonera</option>
                <option value="Confraternidad">Confraternidad</option>
                <option value="Paraiso">Paraiso</option>
                <option value="Molino">Molino</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <input
              type="submit"
              value="Agregar cliente"
              className="text-white border-white bg-blue-400 hover:bg-blue-500 rounded-3xl py-2.5 px-20 my-10 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;
