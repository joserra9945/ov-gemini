/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { authentication } from '@shared/hooks/endpoints';
import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

import axiosInstance from './config/axios.config';

export default class UsuarioService {
  suplantarIdentidad(empresaId) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/UsuarioInterno/empresa-activa/${empresaId}`
    );
  }

  confirmEmail(token, userId) {
    return axiosInstance.post(
      `/Confirm-email`,
      {
        token,
        userId,
      },
      {
        baseURL: `${process.env.REACT_APP_API_URL}${authentication}`,
      }
    );
  }

  refreshToken(accessToken, product, refreshToken) {
    return axiosInstance.post(
      `/Refresh-token`,
      {
        accessToken,
        product,
        refreshToken,
      },
      {
        baseURL: `${process.env.REACT_APP_API_URL}${authentication}`,
      }
    );
  }
}
