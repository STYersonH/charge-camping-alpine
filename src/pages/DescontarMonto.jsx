import React, { createRef, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import {
	actualizarMonto,
	agregarHistorial,
	getClient,
} from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import HeaderConBoton from "../components/HeaderConBoton";
import { usuariosConPermiso } from "../data/UsuariosConPermiso";
import { obtenerFechaActual, obtenerHoraActual } from "../utils/functions";

const DescontarMonto = () => {
	const navigate = useNavigate();
	const [{ clientActual, user }, reducer] = useStateValue();

	const totalRef = createRef();

	const handleRegistrarMonto = async (e) => {
		// si se ingresa una cadena vacia, no deberia ocurrir nada
		if (totalRef.current.value) {
			console.log("total ref current value: ", totalRef.current.value);
			e.preventDefault();
			const datosDescontarMonto = {
				id: clientActual.dni + Date.now(),
				idCliente: clientActual.dni,
				saldo:
					parseFloat(clientActual.saldo) - parseFloat(totalRef.current.value),
				tipoAccion: "descontar",
				cantidad: null,
				modelo: null,
				monto: parseFloat(totalRef.current.value),
				fecha: obtenerFechaActual(),
				hora: obtenerHoraActual(),
			};

			await agregarHistorial(datosDescontarMonto);
			await actualizarMonto(datosDescontarMonto.saldo, clientActual.dni);

			const client = await getClient(clientActual.dni);

			//actualzar el cliente actual despues de descontar monto
			await reducer({
				type: actionType.SET_CLIENT_IN_USE,
				clientActual: client,
			});
		}
		// else {
		// 	console.log("no se pudo descontar monto por que no habia");
		// }

		navigate(`/${clientActual.userame}`);
	};

	useEffect(() => {
		if (!usuariosConPermiso.includes(user.email)) {
			navigate("/");
		}
	}, []);

	return (
		<div className="flex flex-col justify-center">
			<HeaderConBoton link2regresar={clientActual.username} />
			<h1 className="text-3xl text-center mt-5">Descontar monto</h1>
			<div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
			<div className="flex flex-col items-center">
				<form className="my-container " onSubmit={handleRegistrarMonto}>
					{/* calculable */}
					<div className="m-3">
						<label htmlFor="" className="pb-2">
							Total:
						</label>
						<input
							type="number"
							placeholder="total"
							className="border-2 p-2 w-full rounded-2xl"
							ref={totalRef}
						/>
					</div>

					<div className="w-full flex justify-center">
						<input
							type="submit"
							value="Descontar monto"
							className="text-white border-white bg-blue-400 hover:bg-blue-500 rounded-3xl py-2.5 px-20 my-10 cursor-pointer"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DescontarMonto;
