import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

//Saving a new client
export const saveClient = async (data) => {
  await setDoc(doc(db, "clients", `${Date.now()}`), data, {
    merge: true,
  });
};
