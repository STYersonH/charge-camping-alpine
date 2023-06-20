import { fetchClientActual, fetchUser } from "../utils/fetchLocalStorage";

const userInfo = fetchUser();
const clientActual = fetchClientActual();

export const initialState = {
	user: userInfo,
	clientsForCobrador: null,
	clientActual: clientActual,
	modeloProductoActual: null,
	mochilas: null,
	historialActual: null,
};
