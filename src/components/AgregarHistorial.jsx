import React from "react";

const AgregarHistorial = ({ historial }) => {
	const { fecha, monto, saldo, tipoAccion } = historial;
	console.log("tipo de fecha", typeof fecha);

	return (
		<div>
			<div className="flex justify-around ml-8">
				{tipoAccion === "inicial" && (
					<>
						<div className="w-3/12 text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div className="w-4/12 text-gray-600">{historial.fecha}</div>
						<div className="w-1/4 text-gray-600">{`   --   `}</div>
						<div className="w-1/4 text-gray-600">{saldo}</div>
					</>
				)}
				{tipoAccion === "agregar" && (
					<>
						<div className="w-3/12 text-red-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 15.75l7.5-7.5 7.5 7.5"
								/>
							</svg>
						</div>
						<div className="w-4/12 text-red-600">{historial.fecha}</div>
						<div className="w-1/4 text-red-600">+{monto}</div>
						<div className="w-1/4 text-red-600">{saldo}</div>
					</>
				)}
				{tipoAccion === "descontar" && (
					<>
						<div className="w-3/12 text-green-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</div>
						<div className="w-4/12 text-green-600">{historial.fecha}</div>
						<div className="w-1/4 text-green-600">-{monto}</div>
						<div className="w-1/4 text-green-600">{saldo}</div>
					</>
				)}
			</div>
			<div className="border-2 m-1.5"></div>
		</div>
	);
};

export default AgregarHistorial;
