/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';

const CONTROLLER = `${API_GENERIC_GATEWAY}/Factura`;
export default class FacturasService {
  getFacturaById(facturaId) {
    return axios.get(`${CONTROLLER}/${facturaId}`);
  }

  getFacturaFileById(facturaId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/base64-jpg/by-documento-id/${facturaId}`
    );
  }

  getFacturaFileByIdPDF(facturaId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/pdf/by-documento-id/${facturaId}`,
      {
        responseType: 'blob',
      }
    );
  }

  postFicheroReemplazoById(id, files) {
    const datos = new FormData();
    if (files?.length)
      files.forEach((row) => {
        datos.append('rawFile', row.file, row.file.name);
      });
    return axios.post(
      `${CONTROLLER}/fichero-reemplazo/by-id/${id}?createBackup=true`,
      datos
    );
  }

  postLinkToNewOperacion(data, productoId) {
    return axios.post(
      `${CONTROLLER}/link-to-new-operacion?productoId=${productoId}`,
      data
    );
  }

  postFacturaFile(form, parseDates = true) {
    const datos = new FormData();

    if (form?.files?.length)
      form?.files?.map((row) => {
        datos.append('FormFiles', row.file, row.file.name);
        return false;
      });

    if (form?.fechaEmision)
      datos.append(
        'FechaEmision',
        parseDates ? toLocalFormat(form.fechaEmision) : form.fechaEmision
      );

    if (form?.fechaVencimiento)
      datos.append(
        'FechaVencimiento',
        parseDates
          ? toLocalFormat(form.fechaVencimiento)
          : form.fechaVencimiento
      );

    datos.append('ImporteNominal', form?.importeNominal);
    datos.append('LibradoCif', form?.libradoCif);
    datos.append('LibradoRazonSocial', form?.libradoRazonSocial);
    datos.append('Numero', form?.numero || '');
    datos.append('LibradorId', form?.libradorId);
    return axios.post(`${CONTROLLER}`, datos);
  }

  putFacturaById(data, facturaId) {
    const parsedData = {
      id: facturaId,
      fechaEmision: toLocalFormat(data?.fechaEmision),
      fechaVencimiento: toLocalFormat(data?.fechaVencimiento),
      importeNominal: data.importeNominal,
      numero: data.numero,
    };
    return axios.put(`${CONTROLLER}`, parsedData);
  }

  putFacturaFileById(form, facturaId) {
    const datos = new FormData();
    if (!form?.files) return;

    form.files.forEach((row) => {
      datos.append('rawFile', row.file, row.file.name);
    });
    return axios.put(
      `${CONTROLLER}/ficheros/by-id/${facturaId || form.id}`,
      datos
    );
  }

  getFacturaByPagareId(pagareId) {
    return axios.get(`${CONTROLLER}/by-pagare-id/${pagareId}`);
  }

  getFacturaVinculableByFilters(pagareId, queryState) {
    return axios.get(
      `${CONTROLLER}/vinculables-a-pagare/by-filters${queryState}&PagareId=${pagareId}`
    );
  }
}
