import { IGenericResponse } from '../IGenericResponse';

interface IIngresoAnotacionesByIdGet {
  id: string;
  creationTime: Date;
  ingresoId: string;
  texto: string;
  usuarioInternoId: string;
  usuarioInternoNombre: string;
}

type IIngresoAnotacionesByIdGetG = IGenericResponse<IIngresoAnotacionesByIdGet>;
type IIngresoAnotacionesByIdGetGP = Promise<IIngresoAnotacionesByIdGetG>;

export type {
  IIngresoAnotacionesByIdGet,
  IIngresoAnotacionesByIdGetG,
  IIngresoAnotacionesByIdGetGP,
};
