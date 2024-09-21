/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';
/**
 * Servicio dedicado a la entidad Dni.
 */
export default class DniService {
  /**
   *
   * Método POST de almacenado de datos del Dni.
   * @param {*} form entradas del formulario.
   * @param {*} event contiene el objeto file a subir.
   */
  postDniFile(personaId, FechaVencimiento, files) {
    if (personaId) {
      const datos = new FormData();
      datos.append(
        'CreationDto.FechaVencimiento',
        toLocalFormat(FechaVencimiento)
      );
      datos.append('CreationDto.EsFicticio', false);
      datos.append('CreationDto.EsRecorte', false);
      datos.append('CreationDto.PersonaId', personaId);
      datos.append('CreationDto.RawData', '');

      files.map((row) => {
        datos.append('FormFile', row.file, row.file.name);
        return false;
      });

      return axios.post(`${API_GENERIC_GATEWAY}/Dni/files`, datos);
    }
  }

  /**
   *
   * Método PUT de almacenado de datos del Dni.
   * @param {*} datos entradas del formulario.
   * @param {*} file contiene el objeto file a subir.
   */
  putDniData(datos) {
    return axios.put(`${API_GENERIC_GATEWAY}/Dni`, datos);
  }

  /**
   *
   * Método POST para sustituir los ficheros del DNI.
   * @param {*} datos entradas del formulario.
   * @param {*} file contiene el objeto file a subir.
   */
  postFicheroReemplazo(id, files) {
    const fileData = new FormData();
    files.forEach((row) => {
      fileData.append('rawFile', row.file, row.file.name);
    });
    return axios.post(
      `${API_GENERIC_GATEWAY}/Dni/fichero-reemplazo/by-id/${id}`,
      fileData
    );
  }

  /**
   *
   * Método POST para sustituir los ficheros del DNI.
   * @param {*} datos entradas del formulario.
   * @param {*} file contiene el objeto file a subir.
   */
  putFichero(id, files) {
    const fileData = new FormData();
    files.forEach((row) => {
      fileData.append('rawFile', row.file, row.file.name);
    });
    return axios.put(
      `${API_GENERIC_GATEWAY}/Dni/ficheros/by-id/${id}`,
      fileData
    );
  }

  /**
   * Método GET que obtiene la verificación de Dni validado por empresa.
   * @param {number} idEmpresa Identificador único de la empresa.
   */
  getDniValidadoByEmpresa(idEmpresa) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Dni/validados-by-empresa-id/${idEmpresa}`
    );
  }

  /**
   * Método GET que obtiene datos de Dni por empresa.
   * @param {number} idEmpresa Identificador único de la empresa.
   */
  getDniByEmpresaId(idEmpresa) {
    return axios.get(`${API_GENERIC_GATEWAY}/Dni/by-empresa-id/${idEmpresa}`);
  }

  getDniFileById(id, esReemplazo = false) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Documento/pdf/by-id/${id}?esReemplazo=${esReemplazo}`,
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
      `${API_GENERIC_GATEWAY}/Dni/fichero-reemplazo/by-id/${id}?createBackup=true`,
      datos
    );
  }

  getNoRechazadoByRepresentanteId(representanteId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Dni/no-rechazado/by-representante-id/${representanteId}`
    );
  }

  getDniByRepresentanteId(representanteId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Dni/by-representante-id/${representanteId}`
    );
  }

  getById(id) {
    return axios.get(`${API_GENERIC_GATEWAY}/Dni/${id}`);
  }

  setEstadoRevision(id, estado) {
    return axios.put(`${API_GENERIC_GATEWAY}/Dni/estados-revision`, {
      estadoRevision,
      ids: [id],
    });
  }
}
