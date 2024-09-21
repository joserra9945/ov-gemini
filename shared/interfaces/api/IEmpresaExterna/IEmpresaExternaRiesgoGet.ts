import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEmpresaExternaRiesgoGet {
  directoImpagado: number;
  directoPropuesto: number;
  directoVencido: number;
  directoVencidoNoCobrado: number;
  directoVivo: number;
  indirectoImpagado: number;
  indirectoPropuesto: number;
  indirectoVencido: number;
  indirectoVencidoNoCobrado: number;
  indirectoVivo: number;
}

type IEmpresaExternaRiesgoGetP = Promise<IEmpresaExternaRiesgoGetG>;
type IEmpresaExternaRiesgoGetG = IGenericResponse<IEmpresaExternaRiesgoGet>;

export type {
  IEmpresaExternaRiesgoGet,
  IEmpresaExternaRiesgoGetG,
  IEmpresaExternaRiesgoGetP,
};
