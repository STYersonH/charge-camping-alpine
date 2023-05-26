export const actionType = {
  SET_USER: "SET_USER",
  SET_CLIENTS_FOR_COBRADOR: "SET_CLIENTS_FOR_COBRADOR",
  SET_CLIENT_IN_USE: "SET_CLIENT_IN_USE",
  SET_MOCHILAS: "SET_MOCHILAS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case actionType.SET_CLIENTS_FOR_COBRADOR: {
      return {
        ...state, //sin esto, se reiniciaran los demas valores
        // con el valor inicial
        clientsForCobrador: action.clients,
      };
    }
    case actionType.SET_CLIENT_IN_USE: {
      return {
        ...state, //sin esto, se reiniciaran los demas valores
        // con el valor inicial
        clientActual: action.clientActual,
      };
    }
    case actionType.SET_MOCHILAS: {
      return {
        ...state,
        mochilas: action.mochilas,
      };
    }
  }
};

export default reducer;
