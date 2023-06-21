import React, { createRef, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
	actualizarInfoMochila,
	agregarMochila,
	getmochilas,
} from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import HeaderConBoton from "../components/HeaderConBoton";
import { usuariosConPermiso } from "../data/UsuariosConPermiso";

const EditarProducto = () => {
	// Obtener regerencias
	const productoModelRef = createRef();
	const productoTipoRef = createRef();
	const productoPrecioRef = createRef();
	const productoCaracteristicasRef = createRef();
	const productoStockRef = createRef();

	const navigate = useNavigate();
	const [{ modeloProductoActual, mochilas, user }, reducer] = useStateValue();

	const handleAddingProduct = async (e) => {
		//prevenir la accion de enviar el formulario
		e.preventDefault();

		const modelProduct = productoModelRef.current.value;
		const tipoProduct = productoTipoRef.current.value;
		const priceProduct = productoPrecioRef.current.value;
		const caracteristicsProduct = productoCaracteristicasRef.current.value;
		const stockProduct = productoStockRef.current.value;
		//crear objeto cliente
		const productDatos = {
			model: modelProduct,
			tipe: tipoProduct,
			price: parseFloat(priceProduct),
			caracteristics: caracteristicsProduct,
			stock: parseInt(stockProduct),
			fechaAdiccion: new Date().toLocaleDateString(),
			horaAdiccion: new Date().toLocaleTimeString(),
		};
		await actualizarInfoMochila(productDatos, modeloProductoActual.id);

		const mochilasActualizadas = await getmochilas();

		// Actualizar el estado global de mochilas
		reducer({
			type: actionType.SET_MOCHILAS,
			mochilas: mochilasActualizadas,
		});

		navigate("/productos");
	};

	useEffect(() => {
		if (!usuariosConPermiso.includes(user.email)) {
			navigate("/");
		}
	}, []);

	return (
		<div className="flex flex-col justify-center">
			<HeaderConBoton link2regresar={"productos"} />
			<h1 className="text-3xl text-center mt-5">editar producto</h1>
			<div className="border-2 my-4 my-container mx-auto border-gray-500"></div>
			<div className="flex flex-col items-center">
				<form className="my-container " onSubmit={handleAddingProduct}>
					<div className="m-3">
						<label htmlFor="" className="pb-2">
							Modelo del producto:
						</label>
						<input
							type="text"
							placeholder="ingresar nombre del producto"
							className="border-2 p-2 w-full rounded-2xl"
							ref={productoModelRef}
							defaultValue={modeloProductoActual.model}
						/>
					</div>

					<div className="m-3">
						<label htmlFor="" className="pb-2">
							tipo del producto:
						</label>
						<input
							type="text"
							placeholder="mochila, maletin, cartera...escribir"
							className="border-2 p-2 w-full rounded-2xl"
							ref={productoTipoRef}
							defaultValue={modeloProductoActual.tipe}
						/>
					</div>

					<div className="m-3">
						<label htmlFor="" className="pb-2">
							precio en S/. :
						</label>
						<input
							type="number"
							placeholder="ingresar precio en soles"
							className="border-2 p-2 w-full rounded-2xl"
							ref={productoPrecioRef}
							defaultValue={modeloProductoActual.price}
						/>
					</div>

					<div className="m-3">
						<label htmlFor="" className="pb-2">
							caracteristicas del producto:
						</label>
						<input
							type="text"
							placeholder="escribir las caracteristicas del producto"
							className="border-2 p-2 w-full rounded-2xl"
							ref={productoCaracteristicasRef}
							defaultValue={modeloProductoActual.caracteristics}
						/>
					</div>

					<div className="m-3">
						<label htmlFor="" className="pb-2">
							stock del producto:
						</label>
						<input
							type="number"
							placeholder="ingresar stock (opcional)"
							className="border-2 p-2 w-full rounded-2xl"
							ref={productoStockRef}
							defaultValue={modeloProductoActual.stock}
						/>
					</div>

					<div className="w-full flex justify-center">
						<input
							type="submit"
							value="confirmar edicion"
							className="text-white border-white bg-blue-400 hover:bg-blue-500 rounded-3xl py-2.5 px-20 my-10 cursor-pointer"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditarProducto;
