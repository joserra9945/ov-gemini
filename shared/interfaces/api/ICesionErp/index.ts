import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

export interface IErpCesion {
  id: string;
  descripcion: string;
  empresaInternaRazonSocial: string;
  estado: number;
  fechaInicioContrato: string;
  librador: { nif: string; razonSocial: string };
}

type ICesionERPGetG = IGenericResponse<IErpCesion[]>;
type ICesionERPGetGP = Promise<ICesionERPGetG>;

export type { ICesionERPGetG, ICesionERPGetGP };
