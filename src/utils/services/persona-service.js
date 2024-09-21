/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { personaModalKyc, toPersonaData } from 'utils/parsers/persona';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

const CONTROLLER = `${API_GENERIC_GATEWAY}/Persona`;
export default class PersonaService {
  get(empresaId, query) {
    return axios.get(`${CONTROLLER}/by-empresa-id/${empresaId}${query}`);
  }

  create(persona) {
    return axios.post(
      `${CONTROLLER}`,
      toPersonaData({
        ...persona,
        empresaId: sessionStorage.getItem('libradorId'),
      })
    );
  }

  edit(persona, esModalKyc = false) {
    return axios.put(
      `${CONTROLLER}`,
      esModalKyc ? personaModalKyc(persona) : toPersonaData(persona)
    );
  }

  remove(personaId) {
    return axios.delete(`${CONTROLLER}/${personaId}`);
  }
}
