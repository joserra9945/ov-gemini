/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class ConfiguracionDocumentoEfecto {
  getConfiguracionDeEfectoInicial(esInicial, tipoDocumentoId) {
    return axios.get(
      `${API_GENERIC_GATEWAY}/TipoDocumento/documentos-de-efecto/by-tipo-documento-id/${tipoDocumentoId}${
        esInicial ? `?esInicial=${esInicial}` : ''
      }`
    );
  }
}
