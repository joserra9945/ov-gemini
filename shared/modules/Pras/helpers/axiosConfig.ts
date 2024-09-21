import { AxiosRequestConfig } from 'axios';

export const getPrasConfig = (esProduccion?: boolean): AxiosRequestConfig => ({
  baseURL: esProduccion ? 'https://api.pras.es' : 'https://api.prepras.app',
  responseType: 'json',
});
