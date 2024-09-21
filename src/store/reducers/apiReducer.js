// reducer snippet

import { tipoDireccionEnum } from '@shared/utils/constants';

const initialState = {
  fetching: false,
  error: null,
  facturaCreada: false,
  version: '',
  boardingPageFormData: {
    type: null,
    libradoCif: '',
    libradoRazonSocial: '',
    importeNominal: null,
    fechaVencimiento: null,
  },
  empresaInfo: 0,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APP_VERSION':
      return {
        ...state,
        version: action.payload,
      };
    case 'SET_FACTURA_CREADA':
      return {
        ...state,
        facturaCreada: action.payload,
      };
    case 'SET_BOARDING_PAGE_DATA': {
      return {
        ...state,
        boardingPageFormData: {
          ...state.boardingPageFormData,
          ...action.payload,
        },
      };
    }
    case 'API_GET_REQUEST':
    case 'API_POST_REQUEST':
    case 'API_PUT_REQUEST':
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case 'API_POST_SUCCESS':
    case 'API_GET_SUCCESS':
    case 'API_PUT_SUCCESS':
      if (action?.payload?.empresaInfo?.direcciones) {
        const direccionSocial = action.payload.empresaInfo.direcciones.find(
          (direccion) =>
            direccion?.tipoDireccion?.id === tipoDireccionEnum.SOCIAL
        );
        sessionStorage.setItem(
          'provinciaId',
          direccionSocial?.provinciaId || null
        );
      }
      return {
        ...state,
        fetching: false,
        error: null,
        ...action.payload,
      };
    case 'API_GET_FAILURE':
    case 'API_POST_FAILURE':
    case 'API_PUT_FAILURE':
      return {
        ...state,
        fetching: false,
        error: action.payload.error,
      };
    // ! DELETE STATE
    case 'API_DEL_STATE':
      return {
        ...{ ...state, [action.payload.text]: undefined },
      };
    default:
      return state;
  }
};

export default apiReducer;
