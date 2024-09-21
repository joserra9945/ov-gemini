/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class DevolverPagareService {
  getDevolverPagareFile(devolverPagareId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/DevolucionDePagares/documento/by-id/${devolverPagareId}`,
      { responseType: 'blob' }
    );
  }

  uploadDevolucionPagareFirmada(devolverPagareId, data) {
    const formData = new FormData();
    formData.append(`formFile`, data[0], data[0]?.name);
    return axios.put(
      `${API_GENERIC_GATEWAY}/DevolucionDePagares/firmar/by-id/${devolverPagareId}`,
      formData
    );
  }
}
