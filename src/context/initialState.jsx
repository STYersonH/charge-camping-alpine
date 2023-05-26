import { fetchUser } from "../utils/fetchLocalStorage";

const userInfo = fetchUser();

export const initialState = {
  user: userInfo,
  clientsForCobrador: null,
  clientActual: null,
  mochilas: null,
};
