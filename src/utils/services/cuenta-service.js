/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class CuentaService {
  getCuentaByEmpresaId() {
    return axios.get(`${API_GENERIC_GATEWAY}/CuentaExterna/by-empresa-activa`);
  }

  putDesactivarById(id, activa = false) {
    return axios.put(
      `${API_GENERIC_GATEWAY}/CuentaExterna/activa/${activa}/by-id/${id}`
    );
  }

  postCuenta(data) {
    const datos = {
      empresaId: sessionStorage.getItem('libradorId'),
      ibanCompleto: data.iban,
    };

    return axios.post(`${API_GENERIC_GATEWAY}/CuentaExterna`, datos, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
