const initialState = {
  error: false,
  location: null,
  match: null,
  history: null,
};

const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_LOCATION':
      return {
        ...state,
        error: false,
      };
    case 'SUCCESS_CURRENT_LOCATION':
      return {
        ...state,
        error: false,
        location: action.payload.location,
        match: action.payload.match,
        history: action.payload.history,
      };
    case 'ERROR_CURRENT_LOCATION':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default routerReducer;
