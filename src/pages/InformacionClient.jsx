import React from "react";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import HeaderConBoton from "../components/HeaderConBoton";

export const InformacionClient = () => {
  // Hooks
  const navigate = useNavigate();
  const [{ clientActual }, reducer] = useStateValue();

  return (
    <div>
      <HeaderConBoton link2regresar={`${clientActual.username}`} />
      <main className="h-[700px] flex flex-col justify-center items-center">
        <div className="my-10 p-2 bg-blue-500 w-container rounded-xl flex">
          <p className="text-white text-xl text-center flex-1">
            {clientActual?.name}
          </p>
          <div
            onClick={() => navigate(`/${clientActual.username}/editar-datos`)}
            className=" w-8 h-8 rounded-full flex justify-center items-center bg-white hover:bg-gray-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        </div>
        {/* mostrar informacion de este cliente */}
        <div className="border-2 border-blue-600 py-1 px-10 mb-5 rounded-2xl">
          <p className="text-blue-600">
            saldo: <span className="font-bold">{clientActual.saldo}</span>
          </p>
        </div>
        <div className="mt-2 w-container border-2 text-center border-emerald-500 py-1 rounded-t-xl">
          <p className="text-emerald-600">
            DNI: <span className="font-bold">{clientActual.dni}</span>
          </p>
        </div>
        <div className="mt-2 w-container border-2 text-center border-emerald-500 py-1">
          <p className="text-emerald-600">
            Celular: <span className="font-bold">{clientActual.celular}</span>
          </p>
        </div>
        <div className="mt-2 w-container border-2 text-center border-emerald-500 py-1">
          <p className="text-emerald-600">
            ciudad: <span className="font-bold">{clientActual.ciudad}</span>
          </p>
        </div>
        <div className="mt-2 w-container border-2 text-center border-emerald-500 py-1 rounded-b-2xl">
          <p className="text-emerald-600">
            centro comercial:{" "}
            <span className="font-bold">{clientActual.centroComercial}</span>
          </p>
        </div>
      </main>
    </div>
  );
};
