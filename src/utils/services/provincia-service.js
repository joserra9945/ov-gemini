/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class ProvinciaService {
  getProvincia() {
    return axios.get(`${API_GENERIC_GATEWAY}/Provincia?MaxResultCount=100`);
  }

  getProvinciaByCodigoPostal(cPostal) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Provincia/by-codigo-postal/${cPostal}`
    );
  }
}
