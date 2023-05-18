import React, { createRef, useState } from "react";
import { useStateValue } from "../context/StateProvider";

import { getClientsForCobrador, saveClient } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  // Obtener regerencias
  const clientNameRef = createRef();

  // Hooks
  const navigate = useNavigate();
  const [{ clientsForCobrador }] = useStateValue();
  const [clientAdding, setClientAdding] = useState("none"); //none, creating

  return (
    <div className="flex flex-col justify-center mt-3">
      <h1 className="text-3xl text-center ">Clientes</h1>
      <div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
      <div className="flex flex-col items-center">
        {/* seccion de clientes */}
        {clientsForCobrador?.map((client, id) => (
          <div
            className="my-container my-1 py-2 bg-blue-600 text-white rounded-xl text-center"
            key={id}
          >
            {client}
          </div>
        ))}
        <div></div>
        {/* seccion para agregar un cliente */}
        <div className="mt-4">
          {clientAdding === "none" && (
            <div
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-3xl cursor-pointer"
              // onClick={() => setClientAdding("creating")}
              onClick={() => {
                navigate("/agregar-cliente");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          {clientAdding === "creating" && (
            <form action="">
              <input
                type="text"
                placeholder="write name client"
                className="border-2 border-gray-500 rounded-2xl px-2 py-1"
                ref={clientNameRef}
              />
              <input
                type="button"
                value="Add"
                className=" bg-green-500 text-white py-[6px] px-4 ml-2 rounded-3xl hover:bg-green-600	cursor-pointer"
                onClick={() => handleAddingClient()}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
