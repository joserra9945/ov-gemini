/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class OperacionesService {
  postOperacionByLibrador(libradorID, productoId) {
    const body = {
      libradorId: libradorID,
      productoId,
    };
    return axios.post(`${API_GENERIC_GATEWAY}/Operacion/`, body);
  }

  getOperacionPrecioById(id) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Tarificador/precios-operacion/by-id/${id}`
    );
  }

  postOperacionSendEmailUploadDoc(operacionId, email) {
    return axios.post(
      `${API_GENERIC_GATEWAY}/SubidaTemporal/send-email/${email}/${operacionId}`
    );
  }

  getResumenOperacionById(idOperacion) {
    return axios.get(`${API_GENERIC_GATEWAY}/Operacion/${idOperacion}`);
  }

  putOperacionCuentaPagoIdById(id, cuentaPagoId) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/Operacion/cuenta-pago-id/${cuentaPagoId}/by-id/${id}`
    );
  }

  getOperacionById(id) {
    return axios.get(`${API_GENERIC_GATEWAY}/Operacion/${id}`);
  }

  getOperacionesClienteById(id) {
    return axios.get(`${API_GENERIC_GATEWAY}/Operacion/cliente/by-id/${id}`);
  }

  getOperacionesCliente() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Operacion/client-view/by-estado?estados=0&estados=1&estados=2&estados=3&estados=4&estados=6&MaxResultCount=100&SkipCount=0`
    );
  }

  getOperacionesClientePendienteDePago() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Operacion/client-view/by-estado?estados=4&MaxResultCount=1`
    );
  }

  getOperacionesClienteByParamsHistoric({ MaxResultCount, SkipCount }) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Operacion/client-view/by-estado?estados=5&estados=7&estados=8&MaxResultCount=${MaxResultCount}&SkipCount=${SkipCount}`
    );
  }

  getDocumentacionRequeridaByCliente() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Operacion/documentacion-requerida`
    );
  }

  deleteOperacion(id) {
    return axios.delete(`${API_GENERIC_GATEWAY}/Operacion/${id}`);
  }
}
