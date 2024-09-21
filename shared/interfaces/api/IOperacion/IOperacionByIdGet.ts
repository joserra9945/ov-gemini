import { IEnum } from '@shared/interfaces/IEnum';

import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IOperacionByIdGet {
  id: string;
  confirmada: boolean;
  descripcionEstado: string;
  documentosPendientesAmount: number;
  efectosVerificados: boolean;
  empresaInternaId: string;
  estado: number;
  estadoCliente: IEnum;
  estadoNombre: string;
  fechaCierre: Date;
  fechaValor: Date;
  importeLiquido: number;
  importeNominal: number;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  numero: number;
  producto: IEnum;
  trazaId: string;
}

type IOperacionByIdGetG = IGenericResponse<IOperacionByIdGet>;
type IOperacionByIdGetP = Promise<IOperacionByIdGet>;
type IOperacionByIdGetGP = Promise<IOperacionByIdGetG>;

export type {
  IOperacionByIdGet,
  IOperacionByIdGetG,
  IOperacionByIdGetGP,
  IOperacionByIdGetP,
};
