/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class TomaRazonService {
  getTomaRazonFile(tomaRazonId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/pdf/by-documento-id/${tomaRazonId}`,
      {
        responseType: 'blob',
      }
    );
  }

  uploadTomaRazonFirmada(tomaRazonId, data) {
    const formData = new FormData();
    formData.append(`formFile`, data[0], data[0]?.name);
    return axios.put(
      `${API_GENERIC_GATEWAY}/TomaDeRazon/firmar-por-librador/by-id/${tomaRazonId}`,
      formData
    );
  }

  postFicheroReemplazoById(id, files) {
    const fileData = new FormData();
    files?.forEach((file) => {
      fileData.append('rawFile', file, file?.name || '');
    });
    return axios.post(
      `${API_GENERIC_GATEWAY}/TomaDeRazon/fichero-reemplazo/by-id/${id}?createBackup=true`,
      fileData
    );
  }

  getTomaRazonIdByEfectoId(efectoId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/TomaDeRazon/id/by-efecto-id/${efectoId}`
    );
  }
}
