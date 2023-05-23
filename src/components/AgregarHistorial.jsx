import React from "react";

const AgregarHistorial = ({ historial }) => {
  const { fecha, monto, saldo, tipoAccion } = historial;
  console.log("tipo de fecha", typeof fecha);

  return (
    <div>
      <div className="flex justify-around">
        {tipoAccion === "inicial" && (
          <>
            <div className="text-gray-600">{tipoAccion}</div>
            <div className="text-gray-600">{`   --   `}</div>
            <div className="text-gray-600">{historial.fecha}</div>
            <div className="text-gray-600">{saldo}</div>
          </>
        )}
        {tipoAccion === "agregar" && (
          <>
            <div className="text-red-600">{tipoAccion}</div>
            <div className="text-red-600">+{monto}</div>
            <div className="text-red-600">{historial.fecha}</div>
            <div className="text-red-600">{saldo}</div>
          </>
        )}
        {tipoAccion === "descontar" && (
          <>
            <div className="text-green-600">{tipoAccion}</div>
            <div className="text-green-600">-{monto}</div>
            <div className="text-green-600">{historial.fecha}</div>
            <div className="text-green-600">{saldo}</div>
          </>
        )}
      </div>
      <div className="border-2 "></div>
    </div>
  );
};

export default AgregarHistorial;
