/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';

const CONTROLLER = `${API_GENERIC_GATEWAY}/FirmaNotarial`;
const EMPRESA_INTERNA_ID = 'B81B4035-F3A9-42FA-727A-08D8C7A311DC';
export default class FirmaCesionService {
  getProximaByLibradorId(libradorId) {
    return axios.get(`${CONTROLLER}/proxima/by-librador-id/${libradorId}`);
  }

  getById(id) {
    return axios.get(`${CONTROLLER}/${id}`);
  }

  getActivaByEmpresaInternaId() {
    return axios.get(
      `${CONTROLLER}/activa/by-empresa-activa/and-by-empresa-interna-id/${EMPRESA_INTERNA_ID}`
    );
  }

  create(firma, cesionId, interno) {
    const data = {
      cesionIds: [cesionId],
      email: firma?.representanteEmail,
      fechaPrevista: toLocalFormat(firma.fechaPrevista),
      notarioId: firma?.notarioId?.id,
      representanteExternoIds: firma?.representanteIds.map((f) => f.id),
      telefono: firma?.representanteTelefono,
    };

    if (interno) {
      data.representanteInternoId = firma?.representanteInternoIds?.id || null;
      data.tipo = firma?.tipo?.id;
    }
    return axios.post(`${CONTROLLER}${interno ? '/interno' : ''}`, data);
  }

  putInterno(firma) {
    const data = {
      id: firma?.id,
      email: firma?.representanteEmail,
      fechaPrevista: toLocalFormat(firma.fechaPrevista),
      notarioId: firma?.notarioId?.id,
      notarioLocalId: firma?.notarioLocalId?.id,
      representanteExternoIds: firma?.representanteIds.map((f) => f.id),
      telefono: firma?.representanteTelefono,
      representanteInternoId: firma?.representanteInternoIds?.id || null,
      tipo: firma?.tipo?.id,
    };
    return axios.put(`${CONTROLLER}/interno`, data);
  }

  putInternoNew(firma) {
    return axios.put(`${CONTROLLER}/interno`, firma);
  }

  createNew(firma, cesionId, interno, formData) {
    try {
      if (formData) {
        const data = {
          cesionIds: [cesionId],
          email: formData?.email,
          fechaPrevista: toLocalFormat(formData?.fechaPrevista),
          notarioId: formData?.notarioId,
          representanteExternoIds: formData?.representanteExternoIds.map(
            (f) => f.id
          ),
          telefono: formData.telefono,
        };
        if (interno) {
          data.representanteInternoId = formData?.representanteInternoId;
          data.tipo = formData?.tipo;
        }
        return axios.post(`${CONTROLLER}${interno ? '/interno' : ''}`, data);
      }
      const data = {
        cesionIds: [cesionId],
        email: firma?.email || formData?.email,
        fechaPrevista:
          toLocalFormat(firma.fechaPrevista) ||
          toLocalFormat(formData?.fechaPrevista),
        notarioId: firma?.notarioId || formData?.notarioId,
        representanteExternoIds:
          firma?.representanteExternoIds.map((f) => f.id) ||
          formData?.representanteExternoIds.map((f) => f.id),
        telefono: firma?.telefono || formData.telefono,
      };

      if (interno) {
        data.representanteInternoId =
          firma?.representanteInternoId || formData?.representanteInternoId;
        data.tipo = firma?.tipo || formData?.tipo;
      }
      return axios.post(`${CONTROLLER}${interno ? '/interno' : ''}`, data);
    } catch (err) {
      console.error(err);
    }
  }

  addCesion(firmaId, cesionId) {
    return axios.put(`${CONTROLLER}/add-cesiones`, {
      id: firmaId,
      cesionIds: [cesionId],
    });
  }
}
