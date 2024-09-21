import { IGenericResponse } from '@shared/interfaces';
import { IEnum } from '@shared/interfaces/IEnum';

interface ICuentaClienteIdMovimientoGet {
  beneficiario: string;
  detalle: string;
  fecha: Date;
  idExterno: string;
  importe: number;
  saldoReal: number;
  tipo: IEnum;
}

type ICuentaClienteIdMovimientoGetG =
  IGenericResponse<ICuentaClienteIdMovimientoGet>;
type ICuentaClienteIdMovimientoGetGP = Promise<ICuentaClienteIdMovimientoGetG>;

export type {
  ICuentaClienteIdMovimientoGet,
  ICuentaClienteIdMovimientoGetG,
  ICuentaClienteIdMovimientoGetGP,
};
