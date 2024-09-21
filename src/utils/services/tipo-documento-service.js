/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

const CONTROLLER = `${API_GENERIC_GATEWAY}/Representante`;

/**
 * Servicio dedicado a la entidad TipoCargo.
 */
export default class TipoDocumentoService {
  /**
   * Método GET del listado diccionario.
   * Filtrado por habilitados con resultados máximos en 1000000;
   */
  getTipoDocumento() {
    return axios.get(`${CONTROLLER}`);
  }
}
