/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from 'react-hook-form';

import { toLocalFormat } from '@shared/utils/formatters';

import { IDataFile } from 'interfaces/IDataFile';
import { IFormasContacto } from 'interfaces/IFormasContacto';

export const parseToFormData = (
  data: FieldValues,
  empresaId: string,
  byPersona: boolean
): FormData => {
  const datos = new FormData();

  datos.append('Cargo', data?.cargo);
  if (data?.fechaVencimiento) {
    datos.append('Dni.FechaVencimiento', toLocalFormat(data.fechaVencimiento));
  }
  datos.append('Dni.Numero', data?.numero);
  datos.append('Dni.EsRecorte', String(false));
  datos.append('Persona.Apellidos', data?.apellidos);
  datos.append('Persona.Departamento', data?.departamento);
  datos.append('Persona.EmpresaId', empresaId);
  datos.append('Persona.EsPuestoPublico', data?.esPuestoPublico || false);
  datos.append('Persona.Nombre', data?.nombre);
  datos.append('Persona.Origen', data?.origen);
  datos.append('Persona.Puesto', data?.puesto);
  datos.append('PorcentajeParticipacion', data?.porcentajeParticipacion || 0);

  if (data?.formasContacto?.length) {
    data.formasContacto.forEach((row: IFormasContacto, index: number) => {
      if (row) {
        datos.append(
          `Persona.FormasContacto[${index}].Tipo`,
          String(row?.tipo)
        );
        datos.append(
          `Persona.FormasContacto[${index}].Valor`,
          String(row?.valor)
        );
        if (!row?.isNewValue) {
          datos.append(`Persona.FormasContacto[${index}].Id`, String(row?.id));
        }
        if (row?.etiquetas?.length) {
          row?.etiquetas.forEach(({ id }: any, position: number) => {
            datos.append(
              `Persona.FormasContacto[${index}].Etiquetas[${position}]`,
              String(id)
            );
          });
        }
        if (byPersona) {
          if (row?.id) {
            datos.append(
              `Persona.FormasContacto[${index}].Id`,
              row?.id as string
            );
          }
          datos.append(
            `Persona.FormasContacto[${index}].LastModificationTime`,
            String(row?.lastModificationTime)
          );
        }
      }
    });
  }
  if (data?.files?.length) {
    data.files.forEach((row: IDataFile) => {
      datos.append('Dni.FormFile', row.file, row.file.name);
    });
  }
  if (byPersona) {
    datos.append('Persona.Id', data?.id);
    datos.append(
      'Persona.LastModificationTime',
      String(data?.lastModificationTime)
    );
  }
  return datos;
};
