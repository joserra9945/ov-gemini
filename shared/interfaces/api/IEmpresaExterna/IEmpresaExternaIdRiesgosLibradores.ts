import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

import { ILibradoLibrador } from '../IPrecio';

interface IEmpresaExternaIdRiesgoLibradoresGet {
  directoVivo: number;
  directoImpagado: number;
  directoPropuesto: number;
  directoVencido: number;
  directoVencidoNoCobrado: number;
  librador: ILibradoLibrador;
}

type IEmpresaExternaIdRiesgoLibradoresGetGP =
  Promise<IEmpresaExternaIdRiesgoLibradoresGetG>;

type IEmpresaExternaIdRiesgoLibradoresGetG =
  IGenericResponse<IEmpresaExternaIdRiesgoLibradoresGet>;

export type {
  IEmpresaExternaIdRiesgoLibradoresGet,
  IEmpresaExternaIdRiesgoLibradoresGetG,
  IEmpresaExternaIdRiesgoLibradoresGetGP,
};
