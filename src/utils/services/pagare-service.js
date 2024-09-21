/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';

export default class PagareService {
  getPagareById(pagareId) {
    return axios.get(`${API_GENERIC_GATEWAY}/Pagare/${pagareId}`);
  }

  getPagareFileById(pagareId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/base64-jpg/by-documento-id/${pagareId}`
    );
  }

  getPagareFileByIdPDF(pagareId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/pdf/by-documento-id/${pagareId}`,
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
      `${API_GENERIC_GATEWAY}/Pagare/fichero-reemplazo/by-id/${id}?createBackup=true`,
      datos
    );
  }

  postPagareFile(form, parseDates = true) {
    const datos = new FormData();
    const esFicticio = form.esFicticio === 2;

    datos.append(`EsFicticio`, esFicticio);
    datos.append('LibradoCif', form.libradoCif);
    datos.append('LibradoRazonSocial', form.libradoRazonSocial);
    datos.append('Numero', esFicticio ? '' : form.numero);
    datos.append('ImporteNominal', form.importeNominal);
    datos.append('LugarEmision', form.lugarEmision);
    datos.append('LibradorId', form?.libradorId);

    if (!esFicticio) {
      if (form.tipo === 'PAGOR') {
        datos.append(`EsALaOrden`, true);
        datos.append(`EsTruncable`, true);
      }

      if (form.tipo === 'PAGNO') {
        datos.append(`EsALaOrden`, false);
        datos.append(`EsTruncable`, true);
      }

      if (form.tipo === 'PAGOT') {
        datos.append(`EsALaOrden`, true);
        datos.append(`EsTruncable`, false);
      }

      if (form.tipo === 'PAGNT') {
        datos.append(`EsALaOrden`, false);
        datos.append(`EsTruncable`, false);
      }
    }

    if (form.fechaEmision)
      datos.append(
        'FechaEmision',
        parseDates ? toLocalFormat(form.fechaEmision) : form.fechaEmision
      );
    if (form.fechaVencimiento)
      datos.append(
        'FechaVencimiento',
        parseDates
          ? toLocalFormat(form.fechaVencimiento)
          : form.fechaVencimiento
      );

    datos.append('Tipo', form.tipo);

    if (form?.facturas?.length > 0) {
      form.facturas.forEach((factura, f) => {
        datos.append(`FacturasIds[${f}]`, factura.id);
      });
    }

    if (form?.files?.length && !esFicticio)
      form.files.forEach((row) => {
        datos.append('FormFiles', row.file, row.file.name);
      });

    return axios.post(`${API_GENERIC_GATEWAY}/Pagare`, datos);
  }

  postLinkToNewOperacion(data, productoId) {
    return axios.post(
      `${API_GENERIC_GATEWAY}/Pagare/link-to-new-operacion?productoId=${productoId}`,
      data
    );
  }

  putPagareById(data, pagareId, lastModificationTime, esFicticio = false) {
    const parsedData = {
      id: pagareId,
      lastModificationTime,
      libradoCif: data.libradoCif,
      libradoRazonSocial: data.libradoRazonSocial,
      numero: data.numero,
      importeNominal: data.importeNominal,
      lugarEmision: data.lugarEmision,
      esALaOrden: data.tipo === 'PAGOR' || data.tipo === 'PAGOT',
      esTruncable: data.tipo === 'PAGOR' || data.tipo === 'PAGNO',
      fechaEmision: toLocalFormat(data.fechaEmision),
      fechaVencimiento: toLocalFormat(data.fechaVencimiento),
      esFicticio,
    };
    return axios.put(`${API_GENERIC_GATEWAY}/Pagare`, parsedData);
  }

  putPagareFileById(form, pagareId) {
    const datos = new FormData();
    if (form.files?.length)
      form.files.forEach((row) => {
        datos.append('rawFile', row.file, row.file.name);
      });
    return axios.put(
      `${API_GENERIC_GATEWAY}/Pagare/ficheros/by-id/${pagareId || form.id}`,
      datos
    );
  }

  getPagareAccionRequeridaWithOperation(efectoId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/acciones-requeridas/pendientes/by-id/${efectoId}?tieneOperacion=true&maxResultCount=100`
    );
  }

  getPagareAccionRequeridas(efectoId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/acciones-requeridas/pendientes/by-id/${efectoId}?maxResultCount=100`
    );
  }

  getPagareAccionRequeridaWithOperationByEmpresa() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/acciones-requeridas/pendientes/by-empresa-activa?tieneOperacion=true&maxResultCount=100`
    );
  }

  getPagareAccionRequeridaWithOperationByOperacion(operacionId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/acciones-requeridas/pendientes/by-operacion-id/${operacionId}?maxResultCount=100`
    );
  }
}
