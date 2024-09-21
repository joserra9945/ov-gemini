import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface ILibradosByOperacionesGet {
  id: string;
  cif: string;
  razonSocial: string;
}

type ILibradosByOperacionesGetG = IGenericResponse<ILibradosByOperacionesGet>;
type ILibradosByOperacionesGetGP = Promise<ILibradosByOperacionesGetG>;

export type {
  ILibradosByOperacionesGet,
  ILibradosByOperacionesGetG,
  ILibradosByOperacionesGetGP,
};
