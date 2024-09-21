/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class GenerarContratoService {
  signContrato(efectoIds, firmanteIds, cuentaPagoId) {
    return axios.post(`${API_GENERIC_GATEWAY}/Operacion`, {
      efectoIds,
      firmanteIds,
      cuentaPagoId,
    });
  }

  signContratoByOperacionId(id) {
    return axios.post(
      `${API_GENERIC_GATEWAY}/Operacion/solicitar-firma/by-id/${id}`
    );
  }

  generacionContratoKyByEmpresaId(empresaId, representantes = []) {
    return axios.post(
      `${API_GENERIC_GATEWAY}/GeneracionContrato/kyc-by-empresaId`,
      {
        empresaId,
        representantes,
      },
      {
        responseType: 'text',
      }
    );
  }
}
