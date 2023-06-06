import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import Header from "../components/Header";
import HeaderConBoton from "../components/HeaderConBoton";

const ProductosMain = () => {
  // Hooks
  const navigate = useNavigate();
  const [{ mochilas }, reducer] = useStateValue();
  const [mochilaAdding, setMochilaAdding] = useState("none");

  return (
    <>
      <HeaderConBoton link2regresar={""} />
      <div className="flex flex-col justify-center mt-3">
        <h1 className="text-3xl text-center ">Productos</h1>
        <div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
        <div className="flex flex-col items-center">
          {/* seccion de productos */}
          {mochilas?.map((mochila, id) => (
            <div
              className="my-container my-1 py-2 border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 text-white rounded-xl text-center cursor-pointer"
              key={id}
              onClick={() => {}}
            >
              {mochila.model}
            </div>
          ))}
          <div></div>
          {/* seccion para agregar un producto */}
          <div className="mt-4">
            {mochilaAdding === "none" && (
              <div
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-3xl cursor-pointer"
                // onClick={() => setClientAdding("creating")}
                onClick={() => {
                  navigate("/agregar-producto");
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductosMain;
