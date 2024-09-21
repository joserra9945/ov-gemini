/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class EfectoService {
  postLinkToNewOperacion(data, productoId) {
    return axios.post(
      `${API_GENERIC_GATEWAY}/Efecto/link-to-new-operacion?producto=${productoId}`,
      data
    );
  }

  addToEstudio(data) {
    return axios.put(`${API_GENERIC_GATEWAY}/Estudio/add-efectos`, data);
  }

  putEfectoEstadoById(data) {
    return axios.put(`${API_GENERIC_GATEWAY}/Efecto/estado-financiacion`, data);
  }

  putEfectoEstadoRevisionById(estado, id) {
    return axios.put(`${API_GENERIC_GATEWAY}/Efecto/estados-revision`, {
      estadoRevision,
      ids: [id],
    });
  }

  putEfectoEstadoByLibradoOperacion(estado, libradoId, operacionId) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/Efecto/estado/${estado}/by-operacion-id/${operacionId}/by-librado-id/${libradoId}`
    );
  }

  getEfectoByOperacionId(id, esFicticio = false) {
    return !esFicticio
      ? axios.get(`${API_GENERIC_GATEWAY}/Efecto/by-operacion-id/${id}`)
      : axios.get(
          `${API_GENERIC_GATEWAY}/Efecto/by-operacion-id/${id}?esFicticio=${esFicticio}`
        );
  }

  getAllEfectoByOperacionId(id) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/by-operacion-id/${id}?MaxResultCount=50`
    );
  }

  getEfectosPedientesByEmpresaActiva(pendientes) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/pendientes/${pendientes}/by-empresa-activa?MaxResultCount=100`
    );
  }

  getFicheroInPDFById(id) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/pdf/by-documento-id/${id}`,
      {
        responseType: 'blob',
      }
    );
  }

  getEfectoById(id) {
    return axios.get(`${API_GENERIC_GATEWAY}/Efecto/${id}`);
  }

  updateDocumentoFileById(id, files) {
    const datos = new FormData();
    if (files?.length)
      files.forEach((row) => {
        datos.append('rawFile', row.file, row.file.name);
      });
    return axios.put(
      `${API_GENERIC_GATEWAY}/Efecto/files/replace-by-id/${id}`,
      datos
    );
  }

  putEstadoFinanciacionPerdidaConMotivo(
    estadoFinanciacion,
    efectoId,
    motivoPerdidaId = null
  ) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/Efecto/estado-financiacion/${estadoFinanciacion}?motivoPerdidaId=${motivoPerdidaId}`,
      [efectoId]
    );
  }

  putUpdateScoring(efectosIds) {
    return axios.put(`${API_GENERIC_GATEWAY}/Efecto/scoring`, {
      efectoIds: efectosIds,
    });
  }

  getAsociablesCesionByCesionId(cesionId, query, cancelToken) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/asociables-a-cesion/by-filters${query}&CesionId=${cesionId}`,
      {
        cancelToken: cancelToken?.token,
      }
    );
  }

  getAsociadosACesionByCesionId(cesionId, query) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/by-cesion-id/${cesionId}${query}`
    );
  }
}
