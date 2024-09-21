import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface ICuentaExternaByEmpresaIdGet {
  id: string;
  activa: boolean;
  entidadBancaria: IEntidadBancaria;
  iban: IIban;
  empresaId: string;
  empresaRazonSocial: string;
  estado: IEnum;
  fechaUltimoEstado: string;
  motivoErrorVerificacion: string;
  titulares: ITitulares[];
}

export interface IEntidadBancaria {
  bic: string;
  codigo: string;
  id: string;
  nombre: string;
}
export interface IIban {
  codigoPais: string;
  completo: string;
  digitoDeControl1: string;
  digitoDeControl2: string;
  entidad: string;
  numeroDeCuenta: string;
  oficina: string;
}

export interface ITitulares {
  cif: string;
  nombre: string;
}

type ICuentaExternaByEmpresaIdGetG =
  IGenericResponse<ICuentaExternaByEmpresaIdGet>;
type ICuentaExternaByEmpresaIdGetGP = Promise<ICuentaExternaByEmpresaIdGetG>;

export type {
  ICuentaExternaByEmpresaIdGet,
  ICuentaExternaByEmpresaIdGetG,
  ICuentaExternaByEmpresaIdGetGP,
};
