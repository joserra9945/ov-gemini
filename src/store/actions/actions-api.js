import { authentication } from '@shared/hooks/endpoints';
import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

const API_URL = process.env.REACT_APP_API_URL;
const product = 'Oficina Virtual';

export const login = (data) => {
  return {
    type: 'LOGIN_REQUEST',
    payload: {
      request: {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}${authentication}/Log-in`,
        data: {
          email: data.email,
          password: data.pass,
          product,
        },
        failAction: 'LOGIN_FAILURE',
        okAction: 'LOGIN_SUCCESS',
      },
    },
  };
};

export const resetToken = (token, refreshToken) => {
  return {
    type: 'REFRESH_TOKEN_REQUEST',
    payload: {
      request: {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}${authentication}/Refresh-token`,
        data: {
          accessToken: token,
          refreshToken,
          product,
        },
        failAction: 'LOGIN_FAILURE',
        okAction: 'REFRESH_TOKEN_SUCCESS',
      },
    },
  };
};
export const setLoginData = (data) => {
  return {
    type: 'SET_LOGIN_DATA',
    payload: {
      data,
      failAction: 'LOGIN_FAILURE',
      okAction: 'LOGIN_SUCCESS',
    },
  };
};

export const setLoginAccountsData = (data) => {
  return {
    type: 'LOGIN_REQUEST_ACCOUNTS',
    payload: {
      data,
      failAction: 'LOGIN_FAILURE',
      okAction: 'LOGIN_SUCCESS',
    },
  };
};

export const setLoginDataShared = (data) => {
  return {
    type: 'SET_LOGIN_DATA_SHARED',
    payload: {
      data,
      failAction: 'LOGIN_FAILURE',
      okAction: 'LOGIN_SUCCESS',
    },
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: {},
  };
};

export const setApiVersion = (apiVersion) => {
  return {
    type: 'SET_APP_VERSION',
    payload: apiVersion,
  };
};

export const setFacturaCreada = (creada) => {
  return {
    type: 'SET_FACTURA_CREADA',
    payload: creada,
  };
};

export const onModifyCompany = (payload) => {
  return {
    type: 'MODIFY_COMPANY',
    payload,
  };
};

export const getDocumentosPendientesLibrador = (libradorId) => {
  return {
    type: 'API_GET_REQUEST',
    payload: {
      request: {
        method: 'get',
        url: `${API_URL}${API_GENERIC_GATEWAY}/EmpresaExterna/${libradorId}`,
        getKey: 'empresaInfo',
        paging: 'false',
        failAction: 'API_GET_FAILURE',
        okAction: 'API_GET_SUCCESS',
      },
    },
  };
};
