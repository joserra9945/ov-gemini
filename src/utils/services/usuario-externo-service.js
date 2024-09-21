/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class UsuarioExternoService {
  putUsuarioExternoValidado(id) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/UsuarioExterno/verificado/true/by-id/${id}`
    );
  }

  putUsuarioExternoInvalidado(id) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/UsuarioExterno/verificado/false/by-id/${id}`
    );
  }

  postUsuarioExterno(data) {
    return axios.post(`${API_GENERIC_GATEWAY}/UsuarioExterno`, data);
  }

  putUsuarioExternoEmpresa(empresaId) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/UsuarioExterno/empresa-activa/${empresaId}`
    );
  }
}
