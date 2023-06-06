import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const BotonGoLink = ({ link2regresar }) => {
  const [{ clientActual }, reducer] = useStateValue();
  const navigate = useNavigate();
  return (
    // Regresar a la pagina principal del cliente
    <div className="flex justify-center h-[35px]">
      <div
        className="h-[35px] w-[50px] rounded-full bg-red-600 flex flex-col justify-center items-center hover:bg-red-700"
        onClick={() => {
          navigate(`/${link2regresar}`);
          console.log("link2regresar: ", link2regresar);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
      </div>
    </div>
  );
};

export default BotonGoLink;
