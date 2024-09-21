import { AxiosRequestConfig } from 'axios';

export const getAxiosConfig = (esProduccion?: boolean): AxiosRequestConfig => ({
  baseURL: esProduccion
    ? 'https://gefintech-api.grupogedesco.com:51436'
    : process.env.REACT_APP_API_URL,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});
