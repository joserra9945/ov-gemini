import { IGenericResponse } from '@shared/interfaces';

interface ICuentaClienteGet {
  id: string;
  empresaInternaId: string;
  libradorId: string;
  saldoReal: number;
  saldoRetenido: number;
}

type ICuentaClienteGetG = IGenericResponse<ICuentaClienteGet>;
type ICuentaClienteGetGP = Promise<ICuentaClienteGetG>;

export type { ICuentaClienteGet, ICuentaClienteGetG, ICuentaClienteGetGP };
