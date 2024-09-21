import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface ICesionERPGet {
  id: string;
  descripcion: string;
  empresaInternaRazonSocial: string;
  estado: number;
  fechaInicioContrato: string;
  librador: { nif: string; razonSocial: string };
}

type ICesionERPGetG = IGenericResponse<ICesionERPGet[]>;
type ICesionERPGetGP = Promise<ICesionERPGetG>;

export type { ICesionERPGet, ICesionERPGetG, ICesionERPGetGP };
