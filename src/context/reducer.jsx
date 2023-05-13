export const actionType = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
  }
};

export default reducer;
