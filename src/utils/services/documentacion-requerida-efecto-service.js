/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class DocumentacionRequeridaEfectoService {
  getDocumentacionRequeridaEfectoPendientesByEfectoId(pendiente, efectoId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/documentacion-requerida/pendiente/by-id/${efectoId}?maxResultCount=100`
    );
  }

  getPendientesByOperacionId(operacionId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/documentacion-requerida/pendiente/by-operacion-id/${operacionId}?maxResultCount=100`
    );
  }

  getEfectoDocumentacionRequeridaWithDevolucionPendiente(empresaId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/documentacion-requerida-devolucion-pendiente/by-empresa-id/${empresaId}`
    );
  }
}
