/* eslint-disable class-methods-use-this */
import axios from 'axios';

import {
  API_GENERIC_GATEWAY,
  tipoDocumentoString,
} from '@shared/utils/constants';

export default class DocumentoEfectoService {
  postDocumentoDeEfectoBulk(data) {
    const datos = new FormData();
    data.forEach((item, i) => {
      const { file, tipoDocumentoId, efectoId } = item;

      datos.append(`DocumentosDeEfecto[${i}].CreationDto.EfectoId`, efectoId);
      datos.append(
        `DocumentosDeEfecto[${i}].CreationDto.TipoDocumentoId`,
        tipoDocumentoId
      );
      datos.append(`DocumentosDeEfecto[${i}].CreationDto.EsFicticio`, false);
      // datos.append(`DocumentosDeEfecto[${i}].CreationDto.RawData`, file);
      datos.append(`DocumentosDeEfecto[${i}].FormFile`, file);
    });

    return axios.post(
      `${API_GENERIC_GATEWAY}/DocumentoDeEfecto/bulk-file`,
      datos
    );
  }

  postDocumentoDeEfecto(data) {
    const datos = new FormData();

    const { files, tipoDocumentoId, efectoId } = data;

    datos.append(`EfectoId`, efectoId);
    datos.append(`TipoDocumentoId`, tipoDocumentoId);
    datos.append(`EsRecorte`, false);

    if (files?.length)
      files.forEach((row) => {
        datos.append('formFiles', row.file, row.file.name);
      });

    return axios.post(`${API_GENERIC_GATEWAY}/DocumentoDeEfecto`, datos);
  }

  getDocumentoDeEfecto(efectoId) {
    return axios.get(`${API_GENERIC_GATEWAY}/DocumentoDeEfecto/${efectoId}`);
  }

  getDocumentosDeEfectoVistaClienteById(efectoId, urlParams) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/DocumentoDeEfecto/vista-cliente/by-efecto-id/${efectoId}${
        urlParams || ''
      }`
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

  setEstadoRevisionDocumentoById(estadoRevision, id, tipoDoc) {
    const obj = {
      estadoRevision,
      ids: [id],
    };
    switch (tipoDoc) {
      case +tipoDocumentoString.FACTURA:
        return axios.put(
          `${API_GENERIC_GATEWAY}/Factura/estados-revision`,
          obj
        );
      case +tipoDocumentoString.PAGARE:
        return axios.put(`${API_GENERIC_GATEWAY}/Pagare/estados-revision`, obj);
      default:
        return axios.put(
          `${API_GENERIC_GATEWAY}/DocumentoDeEfecto/estados-revision/`,
          obj
        );
    }
  }

  postFicheroReemplazoById(id, files) {
    const datos = new FormData();
    if (files?.length)
      files.forEach((row) => {
        datos.append('rawFile', row.file, row.file.name);
      });
    return axios.post(
      `${API_GENERIC_GATEWAY}/DocumentoDeEfecto/fichero-reemplazo/by-id/${id}?createBackup=true`,
      datos
    );
  }
}
