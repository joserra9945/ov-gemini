/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
// import { estadosRevisionDocumentos } from "utils/constants";
import { newFormatDateUTC } from '@shared/utils/formatters';

export default class DocumentoRepresentanteService {
  post(files, data) {
    const form = new FormData();
    form.append('RepresentanteId', data?.representanteId);
    form.append('EmpresaId', data?.id);

    files.forEach((row) => {
      form.append('FormFiles', row?.file);
    });
    form.append('TipoDocumentoId', data?.tipoDocumentoId);
    form.append('fechaVencimiento', newFormatDateUTC(data?.fechaVencimiento));

    return axios.post(`${API_GENERIC_GATEWAY}/DocumentoDeRepresentante`, form);
  }

  getDocumentosByRepresentanteId(id) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/DocumentoDeRepresentante/by-representante-id/${id}`
    );
  }

  postFicheroReemplazoById(id, files) {
    const datos = new FormData();
    if (files?.length)
      files.forEach((row) => {
        datos.append('rawFile', row.file, row.file.name);
      });
    return axios.post(
      `${API_GENERIC_GATEWAY}/DocumentoDeRepresentante/fichero-reemplazo/by-id/${id}?createBackup=true`,
      datos
    );
  }
}
