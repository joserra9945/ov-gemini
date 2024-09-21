// #region STEPPER
export const setCurrentStepEffect = (data) => {
  return {
    type: 'SET_CURRENT_EFFECT',
    payload: {
      getKey: 'effects',
      failAction: 'ERROR_CURRENT_STEP',
      okAction: 'SUCCESS_CURRENT_EFFECT_STEP',
      step: data.step,
    },
  };
};

export const setCurrentEffect = (data) => {
  return {
    type: 'SET_CURRENT_EFFECT',
    payload: {
      ...data,
      getKey: 'effects',
      failAction: 'ERROR_CURRENT_STEP',
      okAction: 'SUCCESS_CURRENT_EFFECT_INFO',
    },
  };
};

export const resetEffects = () => {
  return {
    type: 'EFFECT_DEL_STATE',
  };
};

export const setSelectedEffects = (data) => {
  return {
    type: 'SET_SELECTED_EFFECT',
    payload: {
      selectedEfectos: data,
    },
  };
};

export const switchEffectView = (data) => {
  return {
    type: 'SWITCH_EFFECT_VIEW',
    payload: data,
  };
};

export const persistPagareFormData = (data) => {
  return {
    type: 'PERSIST_PAGARE_FORM_DATA',
    payload: data,
  };
};

export const resetPagareFormData = () => {
  return {
    type: 'RESET_PAGARE_FORM_DATA',
  };
};

export const resetFacturaFormData = () => {
  return {
    type: 'RESET_FACTURA_FORM_DATA',
  };
};

export const appendFacturaToPagareForm = (data) => {
  return {
    type: 'APPEND_FACTURA_TO_PAGARE_FORM',
    payload: data,
  };
};

export const persistVincularFormData = (data) => {
  return {
    type: 'PERSIST_VINCULAR_FORM_DATA',
    payload: data,
  };
};
