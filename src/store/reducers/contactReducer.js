const initialState = {
  newRepresentante: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REPRESENTANTE':
      return {
        ...state,
        newRepresentante: action.payload,
      };
    case 'REMOVE_REPRESENTANTE':
      return {
        ...state,
        newRepresentante: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
