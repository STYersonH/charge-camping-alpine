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
        <div className="my-10 p-2 bg-blue-500 w-container rounded-xl">
          <p className="text-white text-xl text-center">{clientActual?.name}</p>
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
