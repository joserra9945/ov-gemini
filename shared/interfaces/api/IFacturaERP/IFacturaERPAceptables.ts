import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IFacturaERPAceptableGet {
  id: string;
  idExterno: string;
  estado: number;
  fechaEmision: string;
  importe: number;
  librador: { nif: string; razonSocial: string };
  numero: string;
}

type IFacturaERPAceptableGetG = IGenericResponse<IFacturaERPAceptableGet[]>;
type IFacturaERPAceptableGetGP = Promise<IFacturaERPAceptableGetG>;

export type {
  IFacturaERPAceptableGet,
  IFacturaERPAceptableGetG,
  IFacturaERPAceptableGetGP,
};
