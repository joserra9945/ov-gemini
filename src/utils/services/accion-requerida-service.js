/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class AccionRequeridaService {
  getAccionesRequeridasEmpresa() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/acciones-requeridas/pendientes/by-empresa-activa?maxResultCount=100`
    );
  }

  getAccionesRequeridasCesionEmpresa() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/EmpresaExterna/acciones-requeridas/pendientes/cesion/by-empresa-activa?maxResultCount=100`
    );
  }

  getAccionesRequeridasEfecto() {
    return axios.get(
      `${API_GENERIC_GATEWAY}/Efecto/acciones-requeridas/pendientes/by-empresa-activa?maxResultCount=100&tieneOperacion=true`
    );
  }
}
