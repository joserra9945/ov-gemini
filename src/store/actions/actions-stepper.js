// #region STEPPER
export const getCurrentStep = (data) => {
  return {
    type: 'GET_CURRENT_STEP',
    payload: {
      getKey: 'stepper',
      currentStep: data.currentStep,
      onBoard: data.onBoard,
    },
  };
};

export const setCurrentStep = (payload) => {
  return {
    type: 'SET_CURRENT_STEP',
    payload,
  };
};

export const resetStepper = () => {
  return {
    type: 'RESET_STATES',
  };
};
