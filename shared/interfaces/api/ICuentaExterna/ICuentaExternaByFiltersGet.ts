import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

export interface IEntidadBancaria {
  bic: string;
  codigo: string;
  id: string;
  nombre: string;
}

export interface ITitulares {
  cif: string;
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

interface ICuentaExternaByFiltersGet {
  id: string;
  activa: boolean;
  entidadBancaria: IEntidadBancaria;
  iban: IIban;
  empresaId: string;
  empresaRazonSocial: string;
  estado: IEnum;
  fechaUltimoEstado: Date;
  motivoErrorVerificacion: string;
  titulares: ITitulares[];
}

type ICuentaExternaByFiltersGetG = IGenericResponse<ICuentaExternaByFiltersGet>;

type ICuentaExternaByFiltersGetGP = Promise<ICuentaExternaByFiltersGetG>;

export type {
  ICuentaExternaByFiltersGet,
  ICuentaExternaByFiltersGetG,
  ICuentaExternaByFiltersGetGP,
};
