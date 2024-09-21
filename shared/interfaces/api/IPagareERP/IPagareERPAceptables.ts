import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IPagareERPAceptableGet {
  id: string;
  estado: number;
  fechaEmision: string;
  importe: number;
  librador: { nif: string; razonSocial: string };
  numero: string;
}

type IPagareERPAceptableGetG = IGenericResponse<IPagareERPAceptableGet[]>;
type IPagareERPAceptableGetGP = Promise<IPagareERPAceptableGetG>;

export type {
  IPagareERPAceptableGet,
  IPagareERPAceptableGetG,
  IPagareERPAceptableGetGP,
};
