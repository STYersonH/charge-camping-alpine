//buscar informacion del usuario en el almacenamiento local
export const fetchUser = () => {
  const userInfo =
    //obtener cadena JSON almaenada prev bajo la clave 'user' en el almacenamiento del navegador local y verificar si es distinta a undefined
    localStorage.getItem("user") !== "undefined"
      ? //convertir de vuelta a un obj de js
        JSON.parse(localStorage.getItem("user"))
      : // si no existe se llama al metodo para borrar los datos de almacenamiento local
        localStorage.clear();

  return userInfo;
};

export const fetchClientActual = () => {
  const clientActualInfo =
    //obtener cadena JSON almaenada prev bajo la clave 'user' en el almacenamiento del navegador local y verificar si es distinta a undefined
    localStorage.getItem("actualClient") !== "undefined"
      ? //convertir de vuelta a un obj de js
        JSON.parse(localStorage.getItem("actualClient"))
      : // si no existe se llama al metodo para borrar los datos de almacenamiento local
        localStorage.clear();

  return clientActualInfo;
};

export const fetchProductos = () => {
  const products =
    //obtener cadena JSON almaenada prev bajo la clave 'user' en el almacenamiento del navegador local y verificar si es distinta a undefined
    localStorage.getItem("products") !== "undefined"
      ? //convertir de vuelta a un obj de js
        JSON.parse(localStorage.getItem("products"))
      : // si no existe se llama al metodo para borrar los datos de almacenamiento local
        localStorage.clear();

  return products;
};
