// #region OPERACIONES
export const getCurrentLocation = (data) => {
  return {
    type: 'GET_CURRENT_LOCATION',
    payload: {
      getKey: 'router',
      location: data.location,
      match: data.match,
      history: data.history,
      failAction: 'ERROR_CURRENT_LOCATION',
      okAction: 'SUCCESS_CURRENT_LOCATION',
    },
  };
};
