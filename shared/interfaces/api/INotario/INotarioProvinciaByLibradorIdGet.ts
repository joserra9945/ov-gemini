import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

type INotarioProvinciaByLibradorIdGet = {
  id: string;
  nombreCompleto: string;
};

type INotarioProvinciaByLibradorIdGetG =
  IGenericResponse<INotarioProvinciaByLibradorIdGet>;
type INotarioProvinciaByLibradorIdGetGP =
  Promise<INotarioProvinciaByLibradorIdGetG>;

export type {
  INotarioProvinciaByLibradorIdGet,
  INotarioProvinciaByLibradorIdGetG,
  INotarioProvinciaByLibradorIdGetGP,
};
