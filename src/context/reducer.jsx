export const actionType = {
  SET_USER: "SET_USER",
  SET_CLIENTS_FOR_COBRADOR: "SET_CLIENTS_FOR_COBRADOR",
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
  }
};

export default reducer;
