import React from "react";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import HeaderConBoton from "../components/HeaderConBoton";

const HistorialDetalles = () => {
	const navigate = useNavigate();
	const [{ clientActual, historialActual }, reducer] = useStateValue();

	return (
		<div>
			<div>
				<HeaderConBoton link2regresar={`${clientActual.username}/historial`} />
				<main className="h-[700px] flex flex-col justify-center items-center">
					{historialActual.tipoAccion === "descontar" && (
						<>
							{/* mostrar informacion de este cliente */}
							<div className="flex items-center border-2 border-green-600 py-1 px-10 mb-5 rounded-2xl">
								<div className="m-2 mr-4 bg-green-600 rounded-full ">
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
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</div>

								<p className="text-green-600">descontar</p>
							</div>

							{/* Mostrar como interactuo el saldo */}
							<div className="mt-5 p-2 bg-green-600 w-container rounded-t-xl flex items-center justify-center">
								<p className="text-white text-xl text-center">
									S/. {historialActual.saldo + historialActual.monto}
								</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-white mx-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
									/>
								</svg>
								<p className="text-white text-xl text-center">
									S/. {historialActual.saldo}
								</p>
							</div>
							{/* Mostrar la cantidad disminuida */}
							<div className="mb-5 p-2 border-2 border-green-600 w-container rounded-b-xl flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-green-600 mr-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
									/>
								</svg>

								<p className="text-green-600 text-xl text-center">
									S/. {historialActual.monto}
								</p>
							</div>

							<div className="mt-2 w-container border-2 text-center rounded-t-2xl border-blue-500 py-1">
								<p className="text-blue-500">
									fecha:{" "}
									<span className="font-bold">{historialActual.fecha}</span>
								</p>
							</div>
							<div className="mt-2 w-container border-2 text-center border-blue-500 py-1">
								<p className="text-blue-500">
									hora:{" "}
									<span className="font-bold">{historialActual.hora}</span>
								</p>
							</div>
							<div className="mt-2 w-container text-center bg-blue-500 py-1 rounded-b-2xl">
								<p className="text-white">
									Cliente:{" "}
									<span className="font-bold">{clientActual.name}</span>
								</p>
							</div>
						</>
					)}
					{historialActual.tipoAccion === "agregar" && (
						<>
							{/* mostrar informacion de este cliente */}
							<div className="flex items-center border-2 border-red-600 py-1 px-10 mb-5 rounded-2xl">
								<div className="m-2 mr-4 bg-red-600 rounded-full ">
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
											d="M4.5 15.75l7.5-7.5 7.5 7.5"
										/>
									</svg>
								</div>

								<p className="text-red-600">agregar</p>
							</div>

							{/* Mostrar detalles de mochilas */}
							<div className="mt-5 p-2 bg-red-600 w-container rounded-t-xl flex items-center justify-center border-b-2">
								<p className="text-white text-lg text-center">
									modelo:{" "}
									<span className="font-bold">{historialActual.modelo}</span>
								</p>
							</div>
							{/* precio y cantidad */}
							<div className="flex w-container border-b-2">
								{/* precio */}
								<div className="w-1/2 p-2 bg-red-600 flex items-center justify-center border-r-2">
									<p className="text-white text-lg text-center">
										<span className="font-bold">
											S/.{historialActual.costoModelo}
										</span>
									</p>
								</div>
								{/* mostrar la cantidad */}
								<div className="w-1/2 p-2 bg-red-600 flex items-center justify-center">
									<p className="text-white text-lg text-center">
										<span className="font-bold">
											x{historialActual.cantidad}
										</span>
									</p>
								</div>
							</div>
							{/* total */}
							<div className="p-2 bg-red-600 w-container rounded-b-xl flex items-center justify-center">
								<p className="text-white text-lg text-center">
									<span className="font-bold text-xl">
										S/.{historialActual.monto}
									</span>
								</p>
							</div>

							{/* Mostrar como interactuo el saldo */}
							<div className="mt-5 p-2 bg-red-600 w-container rounded-t-xl flex items-center justify-center">
								<p className="text-white text-xl text-center">
									S/. {historialActual.saldo - historialActual.monto}
								</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-white mx-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
									/>
								</svg>
								<p className="text-white text-xl text-center">
									S/. {historialActual.saldo}
								</p>
							</div>
							{/* Mostrar la cantidad disminuida */}
							<div className="mb-5 p-2 border-2 border-red-600 w-container rounded-b-xl flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-red-600 mr-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
									/>
								</svg>

								<p className="text-red-600 text-xl text-center">
									S/. {historialActual.monto}
								</p>
							</div>

							<div className="mt-2 w-container border-2 text-center rounded-t-2xl border-blue-500 py-1">
								<p className="text-blue-500">
									fecha:{" "}
									<span className="font-bold">{historialActual.fecha}</span>
								</p>
							</div>
							<div className="mt-2 w-container border-2 text-center border-blue-500 py-1">
								<p className="text-blue-500">
									hora:{" "}
									<span className="font-bold">{historialActual.hora}</span>
								</p>
							</div>
							<div className="mt-2 w-container text-center bg-blue-500 py-1 rounded-b-2xl">
								<p className="text-white">
									Cliente:{" "}
									<span className="font-bold">{clientActual.name}</span>
								</p>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
};

export default HistorialDetalles;
