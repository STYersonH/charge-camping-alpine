import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
} from "firebase/firestore";

//Saving a new client
export const saveClient = async (data) => {
  await setDoc(doc(db, "clients", `${Date.now()}`), data, {
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
