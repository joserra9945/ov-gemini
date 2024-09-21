/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';

const CONTROLLER = `${API_GENERIC_GATEWAY}/Tarificador`;

export default class PreciosService {
  postPreciosEfectosByIds(efectosIds, productoId) {
    return axios.post(`${CONTROLLER}/precios-efectos/by-ids`, {
      efectosIds,
      producto: productoId,
    });
  }

  getPrecios(data) {
    const { type, libradoCif, importeNominal, fechaVencimiento } = data;
    return axios.get(
      `${CONTROLLER}/precios-pras?producto=${type}${
        libradoCif ? `&libradoCif=${libradoCif}` : ''
      }${importeNominal ? `&importeNominal=${importeNominal}` : ''}${
        fechaVencimiento
          ? `&fechaVencimiento=${toLocalFormat(fechaVencimiento)}`
          : ''
      }`
    );
  }
}
