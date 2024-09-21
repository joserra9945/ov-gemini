/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

/**
 * Servicio dedicado a encontrar la Razón Social, utilizado en los formularios de factura y pagaré
 */
export default class NotarioService {
  getAll() {
    return axios.get(`${API_GENERIC_GATEWAY}/Notario`);
  }

  getById(id) {
    return axios.get(`${API_GENERIC_GATEWAY}/Notario/${id}`);
  }

  getByProvinciaId(provinciaId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Notario/by-provincia-id/${provinciaId}`
    );
  }
}
