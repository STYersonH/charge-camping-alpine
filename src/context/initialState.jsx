import { fetchUser } from "../utils/fetchLocalStorage";

const userInfo = fetchUser();

export const initialState = {
	user: userInfo,
	clientsForCobrador: null,
	clientActual: null,
	modeloProductoActual: null,
	mochilas: null,
	historialActual: null,
};
