import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
  updateDoc,
  orderBy,
  getFirestore,
  Timestamp,
  FieldValue,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

//import { set } from "firebase/database"
import { getDatabase, ref, set } from "firebase/database";


//Saving a new client
export const saveClient = async (data) => {
  await setDoc(doc(db, "clients", data.dni), data, {
    //id anterior : `${Date.now()}`
    merge: true,
  });
};

// saving changes of a client
export const updateClient = async (data, id) => {
  const clientRef = doc(db, "clients", id);
  await updateDoc(clientRef, {
    name: data.name,
    celular: data.celular,
    centroComercial: data.centroComercial,
    ciudad: data.ciudad,
    fecha: data.fecha,
    hora: data.hora,
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

// Consultar si un cliente con cierto DNI existe en la colección "clients" en Firestore
export const consultarClientePorDNI = async (dni) => {
  const clienteRef = doc(db, "clients", dni);
  const clienteDoc = await getDoc(clienteRef);
  if (clienteDoc.exists()) {
    console.log("confirmo, si existe");
    // El cliente existe en la colección "clients"
    return true;
  } else {
    console.log("no hay tal dni >:v");
    // El cliente no existe en la colección "clients"
    return false;
  }
};

// Create a new historial for new client
//Saving a new client
export const createHistorialClient = async (idCliente, fecha,  saldoInicial) => {
  const data = {
    idCliente: idCliente,
    saldo: saldoInicial,
    tipoAccion: "inicial",
    cantidad: null,
    modelo: null,
    monto: 0,
    fecha: fecha,
    hora: new Date().toLocaleTimeString(),
  };
  await setDoc(doc(db, "historial", `${idCliente}${Date.now()}`), data, {
    merge: true,
  });
};

export const agregarHistorial = async (data) => {
  //data -> idCliente, saldo, tipoAccion, cantidad, modelo, monto

  const nuevoDocRef = doc(db, "historial", data.id);
  await setDoc(nuevoDocRef, data, {
    merge: true,
  });

  // const nuevoDocRef = doc(db, "historial");
  // await setDoc(nuevoDocRef, data, {
  //   merge: true,
  // });

  // const historialRef = collection(db, "historial");
  // const timestamp = FieldValue.serverTimestamp();
  // const id = timestamp.seconds.toString() + timestamp.nanoseconds.toString() + data.id;
  // const nuevoDocRef = doc(historialRef, id);
  // await setDoc(nuevoDocRef, data, { merge: true });

  // const historialRef = collection(db, "historial");
  // const nuevoDocRef = doc(historialRef);
  // await set(nuevoDocRef, data);


};

export const actualizarMonto = async (nuevoSaldo, idCliente) => {
  //const clienteRef = doc(db, "clients", idCliente);
  const clienteRef = doc(db, "clients", idCliente);
  await updateDoc(clienteRef, {
    saldo: nuevoSaldo,
  });
};

export const getHistorialByCliente = async (idCliente) => {
  const HistorialRef = collection(db, "historial");
  const q = query(
    HistorialRef,
    where("idCliente", "==", idCliente),
    orderBy("fecha", "desc"), // Ordenar por campo "fecha" en orden descendente
    orderBy("hora", "desc")   // Ordenar por campo "hora" en orden descendente
  );
  const hitorial = await getDocs(q);

  return hitorial.docs.map((doc) => doc.data());
};

export const getSaldoCliente = async (idCliente) => {
  const HistorialRef = collection(db, "historial");
  const q = query(HistorialRef, where("idCliente", "==", idCliente));
  const historial = await getDocs(q);

  // Obtener el registro con la fecha y hora más recientes
  const registroMasReciente = historial.docs.reduce(
    (registroActual, registroSiguiente) => {
      const fechaActual = new Date(
        registroActual
          .data()
          .fecha.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$2/$1/$3")
      );
      const fechaSiguiente = new Date(
        registroSiguiente
          .data()
          .fecha.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$2/$1/$3")
      );
      const horaActual = new Date("1970/01/01 " + registroActual.data().hora);
      const horaSiguiente = new Date(
        "1970/01/01 " + registroSiguiente.data().hora
      );

      if (fechaSiguiente > fechaActual) {
        return registroSiguiente;
      } else if (
        fechaSiguiente.getTime() === fechaActual.getTime() &&
        horaSiguiente > horaActual
      ) {
        return registroSiguiente;
      } else {
        return registroActual;
      }
    }
  );

  //console.log("El registro mas reciente: ", registroMasReciente.data());

  // Acceder a los datos del registro más reciente
  const saldoCliente = registroMasReciente.data().saldo;

  return saldoCliente;
};

export const agregarMochila = async (data) => {
  //data -> idCliente, saldo, tipoAccion, cantidad, modelo, monto
  await setDoc(doc(db, "mochilas", data.id), data, {
    merge: true,
  });
};

export const actualizarInfoMochila = async (data, id) => {
  const mochilaRef = doc(db, "mochilas", id);
  await updateDoc(mochilaRef, {
    model: data.model,
    tipe: data.tipe,
    price: data.price,
    caracteristics: data.caracteristics,
    stock: data.stock,
    fechaAdiccion: data.fechaAdiccion,
    horaAdiccion: data.horaAdiccion,
  });
};

export const getmochilas = async () => {
  const mochilasRef = collection(db, "mochilas");
  const q = query(mochilasRef);
  const mochilas = await getDocs(q);
  const arregloInformacionMochilas = mochilas.docs.map((doc) => doc.data());

  return arregloInformacionMochilas;
};


//Saving a new pedido
export const savePedido = async (data) => {
  await setDoc(doc(db, "pedidos", data.id), data, {
    //id anterior : `${Date.now()}`
    merge: true,
  });
};
