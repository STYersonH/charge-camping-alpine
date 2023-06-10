import { useNavigate } from "react-router-dom";
import { agregarMochila, savePedido } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import HeaderConBoton from "../components/HeaderConBoton";
import { createRef } from "react";

const RealizarPedido = () => {
	// Obtener regerencias
	const productoModelRef = createRef();
	const pedidoDetallesRef = createRef();

	const navigate = useNavigate();
	const [{ clientActual, mochilas }, reducer] = useStateValue();

	const handleAddingProduct = (e) => {
		//prevenir la accion de enviar el formulario
		e.preventDefault();

		const modelProduct = productoModelRef.current.value;
		const pedidoDetalles = pedidoDetallesRef.current.value;

		//crear objeto cliente
		const productDatos = {
			id: `pedido${Date.now()}`,
			client: clientActual.dni,
			model: modelProduct,
			detalles: pedidoDetalles,
			fechaAdiccion: new Date().toLocaleDateString(),
			horaAdiccion: new Date().toLocaleTimeString(),
		};
		savePedido(productDatos);

		navigate(`/${clientActual.username}`);
	};

	return (
		<div className="flex flex-col justify-center">
			<HeaderConBoton link2regresar={clientActual.username} />
			<h1 className="text-3xl text-center mt-5">agregar pedido</h1>
			<div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
			<div className="flex flex-col items-center">
				<form className="my-container " onSubmit={handleAddingProduct}>
					<div className="m-3">
						<label htmlFor="" className="pb-2">
							Modelo del producto:
						</label>

						<select
							name="Ciudad de ubicacion"
							id="opcion"
							className="bg-white border-2 p-2 rounded-2xl w-full"
							ref={productoModelRef}
						>
							{mochilas.map((mochila) => (
								<option key={mochila.id} value={mochila.model}>
									{mochila.model}
								</option>
							))}
							<option key="otro" value="Otro">
								Otro
							</option>
						</select>
					</div>

					<div className="m-3">
						<label htmlFor="" className="pb-2">
							detalles:
						</label>
						<textarea
							placeholder="escribir algunos detalles"
							className="border-2 p-2 w-full rounded-2xl"
							ref={pedidoDetallesRef}
							rows="4"
							cols="50"
						/>
					</div>

					<div className="w-full flex justify-center">
						<input
							type="submit"
							value="Agregar pedido"
							className="text-white border-white bg-blue-400 hover:bg-blue-500 rounded-3xl py-2.5 px-20 my-10 cursor-pointer"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RealizarPedido;
