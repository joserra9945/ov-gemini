/* eslint-disable class-methods-use-this */
import axios from 'axios';

export default class VerificacionesService {
  getAllVerficicaciones() {
    return axios.get(`/api/Verificaciones/`);
  }

  getAllVerficicacionesNoSent() {
    return axios.get(`/api/Verificaciones/not-sent`);
  }

  getVerficicacionesById(id) {
    return axios.get(`/api/Verificaciones/${id}`);
  }

  postVerificacionesSend(data = '') {
    return axios.post(`/api/Verificaciones/send`, data);
  }

  postVerificacionesPreview(operacionId, libradoId) {
    return axios.post(
      `/api/Verificaciones/preview/by-operacion-id/${operacionId}/by-librado-id/${libradoId}`
    );
  }

  getVerificacionesRejectionReasons(efectos) {
    if (efectos.length === 0) return;

    let query = '';

    efectos.forEach((el, i) => {
      if (i > 0) {
        query += `&efectoIds=${el.id}`;
        return;
      }

      query += `efectoIds=${el.id}`;
    });

    return axios.get(`/api/Verificaciones/rejection-reasons?${query}`);
  }
}
