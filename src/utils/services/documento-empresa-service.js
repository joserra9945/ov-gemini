/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';

export default class DocumentoDeEmpresaService {
  postDocumentoDeEmpresa(empresaId, data, files) {
    const form = new FormData();
    form.append('EmpresaId', empresaId);
    files?.map((row) => {
      form.append('formFiles', row.file, row.file.name);
      return false;
    });
    form.append('EsRecorte', 'false');
    form.append(
      'TipoDocumentoId',
      data?.tipoDocumentoId ?? data?.tipoDocumento?.id
    );
    data?.fechaVencimiento &&
      form.append('FechaVencimiento', toLocalFormat(data?.fechaVencimiento));
    data?.fechaEmision &&
      form.append('FechaEmision', toLocalFormat(data?.fechaEmision));

    return axios.post(`${API_GENERIC_GATEWAY}/DocumentoDeEmpresa`, form);
  }

  getData(libradorId, urlParams) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/DocumentoDeEmpresa/by-empresa-id/${libradorId}${
        urlParams || ''
      }`
    );
  }

  getDocumentacionRequeridaByLibrador(libradorId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/ConfiguracionOperacion/pendientes-by-librador-id/${libradorId}`
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

  getFicheroInJPGById(id) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/base64-jpg/by-documento-id/${id}`
    );
  }

  postFicheroReemplazoById(id, files) {
    const datos = new FormData();
    if (files?.length)
      files.forEach((row) => {
        datos.append('rawFile', row.file, row.file.name);
      });
    return axios.post(
      `${API_GENERIC_GATEWAY}/DocumentoDeEmpresa/fichero-reemplazo/by-id/${id}?createBackup=true`,
      datos
    );
  }

  setEstadoRevisionDocumentoEmpresaById(estadoRevision, id) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/DocumentoDeEmpresa/estados-revision`,
      {
        EstadoRevision: estadoRevision,
        ids: [id],
      }
    );
  }

  removeFicheroDocDeEmpresa(id) {
    return axios.delete(`${API_GENERIC_GATEWAY}/DocumentoDeEmpresa/${id}`);
  }
}
