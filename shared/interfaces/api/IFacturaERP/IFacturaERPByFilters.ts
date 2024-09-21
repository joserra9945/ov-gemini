import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IFacturaERPByFiltersGet {
  id: string;
  nifLibrado?: string;
  nifLibrador?: string;
  razonSocialLibrado?: string;
  razonSocialLibrador?: string;
  divisa: string;
  estadoRevisionActual: number;
  fechaEmision: string;
  importe: number;
  motivo: string;
  numero?: string;
  estadoCesion: number;
  estadoPago: number;
  estadoVerificacion: number;
  serie?: string;
  cesionId: string;
}

type IFacturaERPByFiltersGetG = IGenericResponse<IFacturaERPByFiltersGet[]>;
type IFacturaERPByFiltersGetGP = Promise<IFacturaERPByFiltersGetG>;

export type {
  IFacturaERPByFiltersGet,
  IFacturaERPByFiltersGetG,
  IFacturaERPByFiltersGetGP,
};
