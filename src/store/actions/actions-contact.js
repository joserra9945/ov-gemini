export const addRepresentante = (data) => {
  return {
    type: 'ADD_REPRESENTANTE',
    payload: data,
  };
};

export const removeRepresentante = () => {
  return {
    type: 'REMOVE_REPRESENTANTE',
  };
};
