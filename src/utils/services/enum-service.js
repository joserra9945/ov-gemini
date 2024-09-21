/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

const CONTROLLER = `${API_GENERIC_GATEWAY}/Enum`;
export default class EnumService {
  getEstadosTomaDeRazon() {
    return axios.get(`${CONTROLLER}/estados-toma-de-razon`);
  }

  getFormasJuridicas() {
    return axios.get(`${CONTROLLER}/formas-juridicas`);
  }

  getTiposFormasContacto() {
    return axios.get(`${CONTROLLER}/tipos-formas-contacto`);
  }

  getTiposCargos() {
    return axios.get(`${CONTROLLER}/tipos-cargo-representante`);
  }

  getFinalidadesKYC() {
    return axios.get(`${CONTROLLER}/finalidades-kyc`);
  }

  getOrigenesKYC() {
    return axios.get(`${CONTROLLER}/origenes-kyc`);
  }

  getTiposFirma() {
    return axios.get(`${CONTROLLER}/tipos-firma-notarial`);
  }

  getTiposDireccion() {
    return axios.get(`${CONTROLLER}/tipos-direcciones`);
  }
}
