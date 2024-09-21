import { AxiosRequestConfig } from 'axios';

const environmentEnum = {
  TEST: 'TEST',
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION',
};

const getURLByEnv = (env: string) => {
  switch (env) {
    case environmentEnum.TEST:
      return 'https://gefintech-api.grupogedesco.app:51463';
    case environmentEnum.STAGING:
      return process.env.REACT_APP_API_URL;
    default:
      return 'https://gefintech-api.grupogedesco.com:51437';
  }
};

export const getBasicSearchConfig = (
  environment: string
): AxiosRequestConfig => ({
  baseURL: getURLByEnv(environment),
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const notificationConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
};
