/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues } from 'react-hook-form';

import { IFormasContacto } from '@shared/interfaces/IFormasContacto';

export const parseFormasContacto = (formasContacto: IFormasContacto[]): any => {
  const res =
    formasContacto?.map(
      ({
        id: fcId,
        valor,
        tipo,
        descripcion,
        lastModificationTime: lmt,
        etiquetas: fcEtiquetas,
      }) => {
        const tmp: IFormasContacto = {
          descripcion,
          valor,
          tipo,
          etiquetas: fcEtiquetas?.length
            ? fcEtiquetas?.map(({ id }: any) => id)
            : [],
        };
        if (fcId) {
          // eslint-disable-next-line dot-notation
          tmp['id'] = fcId;
        }
        if (lmt) {
          // eslint-disable-next-line dot-notation
          tmp['lastModificationTime'] = lmt;
        }
        return tmp;
      }
    ) || [];
  return res;
};

export const toPersonaData = (data: FieldValues): any => {
  let basicData: any = {
    apellidos: data?.apellidos,
    departamento: data?.departamento,
    empresaId: data?.empresaId,
    esPuestoPublico: data?.esPuestoPublico,
    formasContacto: parseFormasContacto(data?.formasContacto),
    nombre: data?.nombre,
    origen: 2,
    puesto: data?.puesto,
  };

  if (data?.id) {
    basicData = {
      ...basicData,
      id: data?.id,
      lastModificationTime: data?.lastModificationTime,
    };
  }

  return basicData;
};
