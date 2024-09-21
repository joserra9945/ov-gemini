/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import { formatDateUTC, toLocalFormat } from '@shared/utils/formatters';

const CONTROLLER = `${API_GENERIC_GATEWAY}/Representante`;

export default class RepresentanteService {
  getRepresentanteById(id) {
    return axios.get(`${CONTROLLER}/${id}`);
  }

  getByPersonaId(personaId) {
    return axios.get(`${CONTROLLER}/by-persona-id/${personaId}`);
  }

  getRepresentanteByEmpresaId(empresaId) {
    return axios.get(
      `${CONTROLLER}/by-empresa-id/${empresaId}?MaxResultCount=100`
    );
  }

  getRepresentanteByEmpresaInternaId(empresaId) {
    return axios.get(
      `${CONTROLLER}/by-empresa-id/${empresaId}?MaxResultCount=100`
    );
  }

  createRepresentante(representante, byPersona = false) {
    const datos = new FormData();

    datos.append('Cargo', representante?.cargo);
    datos.append('paisNacionalidadId', representante?.paisNacionalidadId);
    datos.append(
      'fechaNacimiento',
      formatDateUTC(representante?.fechaNacimiento)
    );
    if (representante?.fechaVencimiento) {
      datos.append(
        'Dni.FechaVencimiento',
        toLocalFormat(representante.fechaVencimiento)
      );
    }
    datos.append('Dni.Numero', representante?.numero);
    datos.append('Dni.EsRecorte', false);
    datos.append('Persona.Apellidos', representante?.apellidos);
    datos.append('Persona.Departamento', representante?.departamento);
    datos.append('Persona.EmpresaId', sessionStorage.getItem('libradorId'));
    datos.append(
      'Persona.EsPuestoPublico',
      representante?.esPuestoPublico || false
    );
    datos.append('Persona.Nombre', representante?.nombre);
    datos.append('Persona.Origen', representante?.origen);
    datos.append('Persona.Puesto', representante?.puesto);
    datos.append(
      'PorcentajeParticipacion',
      representante?.porcentajeParticipacion || 0
    );

    if (representante?.formasContacto?.length) {
      let index = 0;
      representante.formasContacto.forEach((row) => {
        if (!row?.id) {
          datos.append(`Persona.FormasContacto[${index}].Tipo`, row?.tipo);
          datos.append(`Persona.FormasContacto[${index}].Valor`, row?.valor);
          if (!row?.isNewValue) {
            datos.append(`Persona.FormasContacto[${index}].Id`, row?.id);
          }

          if (row?.etiquetas?.length) {
            row?.etiquetas.forEach(({ id }, position) => {
              datos.append(
                `Persona.FormasContacto[${index}].Etiquetas[${position}]`,
                String(id)
              );
            });
          }
          if (byPersona && row?.id && row?.lastModificationTime) {
            datos.append(`PersonaContacto[${index}].Id`, row?.id);
            datos.append(
              `Persona.FormasContacto[${index}].LastModificationTime`,
              row?.lastModificationTime
            );
          }
          index += 1;
        }
      });
    }
    if (representante?.files?.length) {
      representante.files.forEach((row) => {
        datos.append(`Dni.FormFile`, row.file, row.file.name);
      });
    }
    if (byPersona) {
      datos.append('Persona.Id', representante?.id);
      datos.append(
        'Persona.LastModificationTime',
        representante?.lastModificationTime
      );
      return axios.post(`${CONTROLLER}/by-persona`, datos);
    }
    return axios.post(`${CONTROLLER}`, datos);
  }

  deleteRepresentanteById(id) {
    return axios.delete(`${CONTROLLER}/${id}`);
  }

  putCargoYFechaYNacionalidad(data) {
    return axios.put(`${CONTROLLER}`, data);
  }

  postRepresentante(data) {
    return axios.post(`${CONTROLLER}`, data);
  }
}
