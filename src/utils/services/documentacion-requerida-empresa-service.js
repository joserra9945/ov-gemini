/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class DocumentacionRequeridaEmpresaService {
  getByLibradorId() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/documentacion-requerida/pendiente/by-empresa-activa?maxResultCount=100`
    );
  }

  getDocumentacionRequeridaCesionByLibradorId() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/documentacion-requerida/pendiente/cesion/by-empresa-activa?maxResultCount=100`
    );
  }

  getDocumentacionRequeridaByPendientesByLibrador(pendiente, libradorId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/documentacion-requerida/pendiente/by-id/${libradorId}?maxResultCount=100`
    );
  }

  removeFromDocRequerida(id, documentoRequeridoId) {
    return axios.delete(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/documentacion-requerida/by-id/${id}/by-documentacion-requerida-id/${documentoRequeridoId}`
    );
  }
}
