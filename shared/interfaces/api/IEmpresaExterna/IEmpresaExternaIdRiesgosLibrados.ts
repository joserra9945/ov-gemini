import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

import { ILibradoLibrador } from '../IPrecio';

interface IEmpresaExternaIdRiesgoLibradosGet {
  indirectoVivo: number;
  indirectoImpagado: number;
  indirectoPropuesto: number;
  indirectoVencido: number;
  indirectoVencidoNoCobrado: number;
  librado: ILibradoLibrador;
}

type IEmpresaExternaIdRiesgoLibradosGetGP =
  Promise<IEmpresaExternaIdRiesgoLibradosGetG>;

type IEmpresaExternaIdRiesgoLibradosGetG =
  IGenericResponse<IEmpresaExternaIdRiesgoLibradosGet>;

export type {
  IEmpresaExternaIdRiesgoLibradosGet,
  IEmpresaExternaIdRiesgoLibradosGetG,
  IEmpresaExternaIdRiesgoLibradosGetGP,
};
