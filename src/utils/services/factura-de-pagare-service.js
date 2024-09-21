/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class FacturaDePagareService {
  setFacturaDePagare(facturaIds, pagareId) {
    return axios.post(`${API_GENERIC_GATEWAY}/Pagare/facturas`, {
      id: pagareId,
      facturaIds: Array.isArray(facturaIds) ? facturaIds : [facturaIds],
    });
  }

  deleteFacturaDePagare(data) {
    return axios.delete(
      `${API_GENERIC_GATEWAY}/Pagare/${data.pagareId}/factura-id/${data.facturaId}`
    );
  }
}
