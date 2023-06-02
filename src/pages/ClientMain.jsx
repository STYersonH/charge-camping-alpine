import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import Historial from "./Historial";
import { useEffect, useState } from "react";
import {
  actualizarMonto,
  getClient,
  getHistorialByCliente,
  getSaldoCliente,
} from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";

const ClientMain = () => {
  // Hooks
  const navigate = useNavigate();
  const { usernameCliente } = useParams();
  const [{ clientsForCobrador, clientActual }, reducer] = useStateValue();
  const [saldoCliente, setSaldoCliente] = useState(0);

  console.log("client actual: ", clientActual);

  // Actualizar el saldo del cliente cada vez que se renderice el componente
  useEffect(() => {
    const fetchData = async () => {
      var saldoClient = 0;
      if ((await getHistorialByCliente(clientActual.dni)).length > 0) {
        saldoClient = await getSaldoCliente(clientActual.dni);
        console.log("saldo client: ", saldoClient);
      }
      await actualizarMonto(saldoClient, clientActual.dni);
      const clienteDatosActualizados = await getClient(clientActual.dni);
      reducer({
        type: actionType.SET_CLIENT_IN_USE,
        //clients: [...clientsForCobrador, clienteDatos.name],
        clientActual: clienteDatosActualizados,
      });
    };

    fetchData();
  }, []);

  console.log("saldo cliente: ", saldoCliente);

  return (
    <div>
      <Header />
      <main className="h-[700px] flex flex-col justify-center items-center">
        <div className="my-10 p-2 bg-blue-500 w-container rounded-xl">
          <p className="text-white text-xl text-center">{clientActual?.name}</p>
        </div>
        {/* mostrar monto */}
        <div className="border-4 py-9 px-[70px] border-black rounded-2xl">
          <p className="text-5xl">s/.{clientActual?.saldo}.00</p>
        </div>
        {/* Botones para cambiar el monto  */}
        <div className="flex gap-5">
          <div
            className="my-10 py-2 px-5 bg-red-500 hover:bg-red-600 rounded-xl cursor-pointer"
            onClick={() => {
              navigate(`/${usernameCliente}/agregar-monto`);
            }}
          >
            <p className="text-white">agregar monto</p>
          </div>
          <div
            className="my-10 py-2 px-5 bg-[#2ECC71] hover:bg-green-600 rounded-xl cursor-pointer"
            onClick={() => {
              navigate(`/${usernameCliente}/descontar-monto`);
            }}
          >
            <p className="text-white">descontar monto</p>
          </div>
        </div>
        {/* Botones de otras opciones */}
        <div
          className="py-2 px-[94px] bg-gray-400 hover:bg-gray-500 rounded-xl cursor-pointer"
          onClick={() => {
            navigate(`/${usernameCliente}/historial`);
          }}
        >
          <p className="text-white">ver historial</p>
        </div>
        <div className="m-5 py-2 px-20 bg-gray-400 hover:bg-gray-500 rounded-xl cursor-pointer">
          <p className="text-white">Realizar pedido</p>
        </div>
        {/* Regresar al menu de clientes */}
        <div
          className="h-[45px] w-[60px] rounded-full bg-red-600 flex flex-col justify-center items-center mt-10 hover:bg-red-700"
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </div>
      </main>
    </div>
  );
};

export default ClientMain;
