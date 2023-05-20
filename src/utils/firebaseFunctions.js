import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore";

//Saving a new client
export const saveClient = async (data) => {
  await setDoc(doc(db, "clients", data.dni), data, {
    //id anterior : `${Date.now()}`
    merge: true,
  });
};

// Get all clients for a Cobrador
export const getClientsForCobrador = async (idCobrador) => {
  const clientsRef = collection(db, "clients");
  const q = query(clientsRef, where("idCobrador", "==", idCobrador));
  const clients = await getDocs(q);

  return clients.docs.map((doc) => doc.data());
};

// Get client with id
export const getClient = async (idClient) => {
  const clientsRef = collection(db, "clients");
  const q = query(clientsRef, where("dni", "==", idClient));
  const clients = await getDocs(q);

  const arrayClients = clients.docs.map((doc) => doc.data());
  return arrayClients[0];
};

// Create a new historial for new client
//Saving a new client
export const createHistorialClient = async (idCliente) => {
  const data = {
    idCliente: idCliente,
    saldo: 0,
    tipoAccion: "inicial",
    cantidad: null,
    modelo: null,
    monto: 0,
  };
  await setDoc(doc(db, "historial", `${idCliente}${Date.now()}`), data, {
    merge: true,
  });
};

export const agregarHistorial = async (data) => {
  //data -> idCliente, saldo, tipoAccion, cantidad, modelo, monto
  await setDoc(doc(db, "historial", `${data.idCliente}${Date.now()}`), data, {
    merge: true,
  });
};

export const actualizarMonto = async (nuevoSaldo, idCliente) => {
  const clienteRef = doc(db, "clients", idCliente);
  await updateDoc(clienteRef, {
    saldo: nuevoSaldo,
  });
};
