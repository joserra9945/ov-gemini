import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IOperacionByLibradorIdGet {
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
type IOperacionByLibradorIdGetG = IGenericResponse<IOperacionByLibradorIdGet>;
type IOperacionByLibradorIdGetGP = Promise<IOperacionByLibradorIdGetG>;
export type {
  IOperacionByLibradorIdGet,
  IOperacionByLibradorIdGetG,
  IOperacionByLibradorIdGetGP,
};
