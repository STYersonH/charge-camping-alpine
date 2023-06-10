import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getHistorialByCliente } from "../utils/firebaseFunctions";
import Header from "../components/Header";
import AgregarHistorial from "../components/AgregarHistorial";
import { useNavigate } from "react-router-dom";
import HeaderConBoton from "../components/HeaderConBoton";
import { actionType } from "../context/reducer";

const Historial = () => {
	const navigate = useNavigate();
	const [{ clientActual, historialActual }, reducer] = useStateValue();
	const [historial, setHistorial] = useState([]);

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
				await setHistorial(historialData.slice().reverse());
			} catch (error) {
				console.error(error);
			}
		};

		obtenerHistorial();
	}, [clientActual.dni]);

	return (
		<div className="">
			<HeaderConBoton link2regresar={clientActual.username} />
			<div className="flex justify-around mt-10 ml-8">
				<p className="w-3/12 pl-2">Tipo</p>
				<p className="w-4/12 pl-2">Fecha</p>
				<p className="w-1/4">Monto</p>
				<p className="w-1/4">Saldo</p>
			</div>
			<div className="border-2 m-2"></div>
			{historial?.reverse().map((hist, id) => (
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
		</div>
	);
};

export default Historial;
