import {
	fetchClientActual,
	fetchProductos,
	fetchUser,
} from "../utils/fetchLocalStorage";

const userInfo = fetchUser();
const clientActual = fetchClientActual();
const products = fetchProductos();

export const initialState = {
	user: userInfo,
	clientsForCobrador: null,
	clientActual: clientActual,
	modeloProductoActual: null,
	mochilas: products,
	historialActual: null,
};
