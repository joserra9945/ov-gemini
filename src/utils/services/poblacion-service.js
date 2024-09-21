/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class PoblacionService {
  getPoblaciones(idProvincia) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Poblacion/unpaged/by-provincia-id/${idProvincia}`
    );
  }

  getTodasPoblaciones() {
    return axios.get(`${API_GENERIC_GATEWAY}/Poblacion`);
  }

  getPoblacionById(pobId) {
    return axios.get(`${API_GENERIC_GATEWAY}/Poblacion/${pobId}`);
  }

  getPoblacionByNombre(nombre) {
    return axios.get(`${API_GENERIC_GATEWAY}/Poblacion/by-nombre/${nombre}`);
  }

  getPoblacionByCodigoPostal(cPostal) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Poblacion/by-codigo-postal/${cPostal}`
    );
  }
}
