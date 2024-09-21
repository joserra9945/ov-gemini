/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';

/**
 * Servicio dedicado a la entidad Empresa.
 */
export default class EmpresaService {
  formObject(data, empresaData) {
    return {
      cnaeId: data.cnae.id,
      id: empresaData.id,
      fechaConstitucion: toLocalFormat(data.fechaConstitucion),
      lastModificationTime: empresaData.lastModificationTime,
      formaJuridicaId: empresaData.tipoSociedad?.id,
      // scoring: empresaData.scoring,
    };
  }

  /**
   * Método GET que obtiene datos acerca de la empresa dado el CIF de empresa.
   * @param {*} idEmpresa Identificador único de la empresa.
   */
  getEmpresaByCif(cif) {
    return axios.get(`${API_GENERIC_GATEWAY}/EmpresaExterna/by-cif/${cif}`);
  }

  getEmpresaLibradorByCif(cif) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/librador/by-cif/${cif}`
    );
  }

  putCnaeIdByEmpresaId(data, empresaData) {
    const request = this.formObject(data, empresaData);
    return axios.put(`${API_GENERIC_GATEWAY}/EmpresaExterna`, request);
  }

  /**
   * Método GET que obtiene datos acerca de la empresa dado el identificador único de empresa.
   * @param {number} idEmpresa Identificador único de la empresa.
   */
  getEmpresaById(idEmpresa) {
    return axios.get(`${API_GENERIC_GATEWAY}/EmpresaExterna/${idEmpresa}`);
  }

  getEmpresaByIdentityId() {
    return axios.get(`${API_GENERIC_GATEWAY}/EmpresaExterna/activa`);
  }

  getContactFormsById(empresaId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/formas-contacto/by-id/${empresaId}`
    );
  }

  getEmpresaWhitoutDireccionSocial(ids) {
    let libradoIds = '';

    ids.forEach((el, i) => {
      if (i === 0) {
        libradoIds += `ids=${el}`;
      } else {
        libradoIds += `&ids=${el}`;
      }
    });

    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/without-contrato-information?${libradoIds}`
    );
  }

  getEmpresaByUsuarioActivo() {
    return axios.get(`${API_GENERIC_GATEWAY}/EmpresaExterna/by-usuario-activo`);
  }

  refreshDirecciones(empresaId) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/refresh-direcciones/by-id/${empresaId}`
    );
  }

  addNewContact(empresaId, data) {
    return axios.post(`${API_GENERIC_GATEWAY}/EmpresaExterna/formas-contacto`, {
      id: empresaId,
      formasDeContacto: data,
    });
  }

  updateContact(empresaId, data) {
    return axios.put(`${API_GENERIC_GATEWAY}/EmpresaExterna/formas-contacto`, {
      id: empresaId,
      formasDeContacto: data,
    });
  }

  getResumenKYC(empresaId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/resumen-kyc/by-id/${empresaId}`
    );
  }
}
