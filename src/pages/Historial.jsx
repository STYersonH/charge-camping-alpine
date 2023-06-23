import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getHistorialByCliente } from "../utils/firebaseFunctions";
import Header from "../components/Header";
import AgregarHistorial from "../components/AgregarHistorial";
import { useNavigate } from "react-router-dom";
import HeaderConBoton from "../components/HeaderConBoton";
import { actionType } from "../context/reducer";
import { usuariosConPermiso } from "../data/UsuariosConPermiso";

const Historial = () => {
	const navigate = useNavigate();
	const [{ clientActual, historialActual, user }, reducer] = useStateValue();
	const [historial, setHistorial] = useState([]);
	const [showAll, setShowAll] = useState(false);

	// Al hacer click, se actualiza el historialActual
	const handleClickHistorial = (historial) => {
		reducer({
			type: actionType.SET_HISTORIAL_IN_USE,
			historialActual: historial,
		});
	};

	useEffect(() => {
		const obtenerHistorial = async () => {
			try {
				const historialData = await getHistorialByCliente(clientActual.dni);
				await setHistorial(historialData);
			} catch (error) {
				console.error(error);
			}
		};

		obtenerHistorial();
	}, [clientActual.dni]);

	useEffect(() => {
		if (!usuariosConPermiso.includes(user.email)) {
			navigate("/");
		}
	}, []);

	// Función para mostrar todos los elementos del historial
	const handleMostrarTodos = () => {
		setShowAll(true);
	};

	// Función para mostrar solo los 10 primeros elementos del historial
	const handleMostrar10 = () => {
		setShowAll(false);
	};

	// Filtrar los registros según el estado showAll
	const historialVisible = showAll ? historial : historial.slice(0, 15);

	return (
		<div className="">
			<div
				style={{ position: "fixed", top: 0, left: 0, right: 0 }}
				className="bg-white border-b-4"
			>
				<HeaderConBoton link2regresar={clientActual.username} />
				<div className="flex justify-around mt-5 pb-2 ml-8">
					<p className="w-3/12 pl-2">Tipo</p>
					<p className="w-4/12 pl-2">Fecha</p>
					<p className="w-1/4">Monto</p>
					<p className="w-1/4">Saldo</p>
				</div>
			</div>
			<div style={{ paddingTop: "100px" }}>
				<div className="border-2 m-2"></div>
				{historialVisible.map((hist, id) => (
					<div
						onClick={() => {
							handleClickHistorial(hist);
							navigate(`/${clientActual.username}/historial/${hist.id}`);
						}}
						key={id}
						className="cursor-pointer"
					>
						<AgregarHistorial historial={hist} />
					</div>
				))}
				{showAll ? (
					<div className="flex w-full justify-center mb-5">
						<button
							onClick={handleMostrar10}
							className="w-container border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-lg mt-4"
						>
							Mostrar 15 mas actuales
						</button>
					</div>
				) : (
					historial.length > 15 && (
						<div className="flex w-full justify-center mb-5">
							<button
								onClick={handleMostrarTodos}
								className="w-container border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-lg mt-4"
							>
								Mostrar Todos
							</button>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default Historial;
