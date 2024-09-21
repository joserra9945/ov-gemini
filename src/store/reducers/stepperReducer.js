const initialState = {
  error: false,
  currentStep: 0,
  onBoard: false,
};

const stepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_STEP':
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        error: false,
        currentStep: action.payload.currentStep,
        onBoard: action.payload.onBoard,
      };
    case 'ERROR_CURRENT_STEP':
      return {
        ...state,
        error: true,
      };
    case 'RESET_STATES':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default stepperReducer;
