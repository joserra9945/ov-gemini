/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY, tipoCesionOv } from '@shared/utils/constants';
import { newFormatDateUTC, toLocalFormat } from '@shared/utils/formatters';

import axiosInstance from './config/axios.config';

axiosInstance.defaults.baseURL = 'https://192.168.1.236:5000';
const CONTROLLER = `${API_GENERIC_GATEWAY}/Cesion`;

export default class CesionService {
  getCesiones() {
    return axios.get(CONTROLLER);
  }

  getCesionesByFilters() {
    return axios.get(`${CONTROLLER}/by-filters`);
  }

  getById(id) {
    return axios.get(`${CONTROLLER}/${id}`);
  }

  getDisponiblesByLibradoLibrador(libradoCif, interno, sorting) {
    const libradorId = sessionStorage.getItem('libradorId');
    return axios.get(
      `${CONTROLLER}/by-filters${
        interno ? '/interno' : ''
      }?Estados=1&Estados=2&LibradoCif=${libradoCif}&LibradorId=${libradorId}${
        sorting || ''
      }`
    );
  }

  getFilesById(id) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Fichero/pdf/by-documento-id/${id}`,
      {
        responseType: 'blob',
      }
    );
  }

  getCesionesByLibrador(libradorId, params, interno) {
    return axios.get(
      `${CONTROLLER}/by-filters${
        interno ? '/interno' : ''
      }?LibradorId=${libradorId}${params ? `&${params}` : ''}`
    );
  }

  postCesion(dataForm, cesionType) {
    const data =
      cesionType === tipoCesionOv.CONTRATO
        ? {
            ...dataForm,
            fechaInicioContrato: newFormatDateUTC(
              dataForm?.fechaInicioContrato
            ),
            fechaFinalizacion: newFormatDateUTC(dataForm?.fechaFinalizacion),
            esConClausula24: true,
            esSinComunicar: false,
            esSinRecurso: false,
          }
        : {
            ...dataForm,
            esConClausula24: true,
          };
    delete data.files;
    delete data.fechaInicio;
    delete data.cif;
    delete data.razonSocial;

    return axios.post(`${CONTROLLER}/factoring`, data);
  }

  putCesion(dataForm, interno, cesionType) {
    const data =
      cesionType === tipoCesionOv.CONTRATO
        ? {
            id: dataForm?.id,
            descripcion: dataForm?.descripcion,
            esConClausula24: dataForm?.esConClausula24,
            esSinComunicar: dataForm?.esSinComunicar,
            esSinRecurso: dataForm?.esSinRecurso,
            importe: dataForm?.importe,
            importePendienteDeEjecutar: dataForm?.importePendienteDeEjecutar,
            porcentajeComision: dataForm?.porcentajeComision,
            porcentajeInteres: dataForm?.porcentajeInteres,
            porcentajeRetencion: dataForm?.porcentajeRetencion,
            validada: dataForm?.validada,
            numero: dataForm?.numero,
            periodo: dataForm?.plazoFinalizacionId?.id || '',
            fechaInicioContrato: newFormatDateUTC(
              dataForm?.fechaInicioContrato
            ),
            fechaFinalizacion: newFormatDateUTC(dataForm?.fechaFinalizacion),
            tipo: cesionType,
          }
        : {
            id: dataForm?.id,
            descripcion: dataForm?.descripcion,
            esConClausula24: dataForm?.esConClausula24,
            esSinComunicar: dataForm?.esSinComunicar,
            esSinRecurso: dataForm?.esSinRecurso,
            importe: dataForm?.importe,
            importePendienteDeEjecutar: dataForm?.importePendienteDeEjecutar,
            porcentajeComision: dataForm?.porcentajeComision,
            porcentajeInteres: dataForm?.porcentajeInteres,
            porcentajeRetencion: dataForm?.porcentajeRetencion,
            validada: dataForm?.validada,
            tipo: cesionType,
          };

    return axios.put(`${CONTROLLER}${interno ? '/interno' : ''}`, data);
  }

  deleteCesion(id) {
    return axios.delete(`${CONTROLLER}/${id}`);
  }

  firmarCesion(firma, id, interno) {
    let data = {
      cesionIds: [id],
      fechaPrevista: toLocalFormat(firma.fechaPrevista),
      notarioId: firma?.notarioId?.id,
      representanteEmail: firma?.representanteEmail,
      representanteIds: firma?.representanteIds.map((f) => f.id),
      representanteTelefono: firma?.representanteTelefono,
      tipo: firma?.tipo?.id,
    };
    let url = `${CONTROLLER}/firma-cesion`;

    if (interno) {
      data = {
        cesionIds: [id],
        fechaPrevista: toLocalFormat(firma.fechaPrevista),
        notarioId: firma?.notarioId?.id,
        notarioLocalId: firma?.notarioLocalId?.id,
        representanteEmail: firma?.representanteEmail,
        representanteInternoIds: firma?.representanteInternoIds
          ? [firma?.representanteInternoIds.id]
          : null,
        representanteIds: firma?.representanteIds.map((f) => f.id),
        representanteTelefono: firma?.representanteTelefono,
        tipo: firma?.tipo?.id,
      };
      url = `${CONTROLLER}/firma-cesion-interno`;
    }
    return axios.post(url, data);
  }

  updateFirmarCesion(firma, id, interno) {
    let data = {
      id: firma?.id,
      lastModificationTime: firma?.lastModificationTime,
      cesionIds: !id ? firma?.cesionIds : [...(firma?.cesionIds || []), id],
      fechaPrevista: toLocalFormat(firma?.fechaPrevista),
      notarioId: firma?.notarioId?.id,
      representanteEmail: firma?.representanteEmail,
      representanteIds: firma?.representanteIds.map((f) => f.id),
      representanteTelefono: firma?.representanteTelefono,
    };
    let url = `${CONTROLLER}/firma-cesion`;
    if (interno) {
      url = `${CONTROLLER}/firma-cesion-interno`;
      data = {
        id: firma?.id,
        lastModificationTime: firma?.lastModificationTime,
        cesionIds: !id ? firma?.cesionIds : [...(firma?.cesionIds || []), id],
        fechaPrevista: toLocalFormat(firma?.fechaPrevista),
        notarioId: firma?.notarioId?.id,
        notarioLocalId: firma?.notarioLocalId?.id,
        representanteEmail: firma?.representanteEmail,
        representanteInternoIds: firma?.representanteInternoIds
          ? [firma?.representanteInternoIds.id]
          : null,
        representanteIds: firma?.representanteIds.map((f) => f.id),
        representanteTelefono: firma?.representanteTelefono,
      };
    }
    return axios.put(url, data);
  }

  putEfectosById(id, efectosId) {
    return axios.put(`${CONTROLLER}/efectos/by-id/${id}`, efectosId);
  }

  putVincularEfectoACesion(dataForm) {
    return axios.put(`${CONTROLLER}/add-efectos`, dataForm);
  }

  putTipoCesion(data) {
    return axios.put(`${CONTROLLER}`, data);
  }

  putDesvincularEfecto(dataForm) {
    return axios.put(`${CONTROLLER}/remove-efectos`, dataForm);
  }
}
