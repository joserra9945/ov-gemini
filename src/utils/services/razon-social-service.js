/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

/**
 * Servicio dedicado a encontrar la Razón Social, utilizado en los formularios de factura y pagaré
 */
export default class RazonSocialService {
  getNameFilteredByStr(str) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/by-razon-social/${str}`
    );
  }

  getLibradorRazonSocial(str) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/libradores/by-filters?RazonSocial=${str}`
    );
  }
}
