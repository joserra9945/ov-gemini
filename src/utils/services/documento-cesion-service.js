/* eslint-disable class-methods-use-this */
import axios from 'axios';

import {
  API_GENERIC_GATEWAY,
  tipoDocumentoString,
} from '@shared/utils/constants';

const CONTROLLER = `${API_GENERIC_GATEWAY}/DocumentoDeCesion`;

export default class DocumentoDeCesionService {
  postDocumentoDeCesion(cesionId, data, files) {
    const form = new FormData();
    form.append('CreationDto.CesionId', cesionId);

    files.map((row) => {
      form.append('FormFile', row.file, row.file.name);
      return false;
    });

    form.append('CreationDto.EsFicticio', false);
    form.append('CreationDto.EsRecorte', false);
    form.append('CreationDto.RawData', '');
    form.append('CreationDto.TipoDocumentoId', data.tipoDocumentoId);

    return axios.post(`${CONTROLLER}/files/`, form);
  }

  postContratoObra(files, cesionId) {
    const formData = new FormData();
    if (files?.length) {
      files.map((row) => {
        formData.append('FormFile', row.file, row.file.name);
        return false;
      });
    }
    formData.append('EsRecorte', 'false');
    formData.append('CesionId', cesionId);

    return axios.post(`${CONTROLLER}/contrato-de-obra`, formData);
  }

  getContratoObraByCesionId(cesionId) {
    return axios.get(
      `${CONTROLLER}/ultimo-no-rechazado/by-cesion-id/${cesionId}/and-by-tipo-documento/${tipoDocumentoString.CONTRATO_OBRA}`
    );
  }

  postFicheroReemplazoById(id, files) {
    const datos = new FormData();
    if (files?.length)
      files.forEach((row) => {
        datos.append('rawFile', row.file, row.file.name);
      });
    return axios.post(
      `$${CONTROLLER}/fichero-reemplazo/by-id/${id}?createBackup=true`,
      datos
    );
  }

  removeFicheroDocDeCesion(id) {
    return axios.delete(`${CONTROLLER}/${id}`);
  }

  getByCesionId(id, query) {
    return axios.get(
      `${CONTROLLER}/by-cesion-id/${id}${query ? `${query}` : ''}`
    );
  }

  getById(id) {
    return axios.get(`${CONTROLLER}/${id}`);
  }
}
