/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';

export default class PaisService {
  getPaises() {
    return axios.get(`${API_GENERIC_GATEWAY}/Pais/unpaged`);
  }
}
