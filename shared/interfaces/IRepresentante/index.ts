import { IDni } from 'interfaces/IDni';
import { IPersona } from 'interfaces/IPersona';

import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

import {
  IRepresentanteByIdsGet,
  IRepresentanteByIdsGetG,
  IRepresentanteByIdsGetGP,
} from './IRepresentanteByIdsGet';

export interface IRepresentante {
  id: string;
  lastModificationTime: Date | string;
  cargo: IEnum;
  cargoNombre: string;
  dni: IDni;
  persona: IPersona;
  porcentajeParticipacion: number;
  verificado: boolean;
  descripcionEstadoCargo?: string;
  descripcionEstadoDni?: string;
  estadoCargo?: IEnum;
  estadoDni?: IEnum;
  numeroDni?: string;
}

export interface IRepresentanteGetByEmpresaId {
  id: string;
  creationTime: string | Date;
  lastModificationTime: string | Date;
  cargo: IEnum;
  descripcionEstadoCargo: string;
  descripcionEstadoDni: string;
  esPuestoPublico: boolean;
  estadoCargo: IEnum;
  estadoDni: IEnum;
  fechaNacimiento: string;
  numeroDni: string;
  paisNacionalidadId: number;
  persona: IPersona;
}

export interface IApoderado {
  id: string;
  nombre?: string;
  description?: string;
}

export interface IRepresentanteFirma {
  id: string;
  nombre?: string;
  description?: string;
}

export interface IRepresentanteFirmantes {
  id: string;
  cargo?: IEnum;
  estadoCargo?: IEnum;
  estadoDni?: IEnum;
  nombre?: string;
  nombreCompleto?: string;
  numeroDni?: string;
}

export interface IRepresentanteValidarCargo {
  id: string | undefined;
  validado: boolean;
}

type IRepresentanteResponse = IGenericResponse<IRepresentante>;

type IRepresentanteGetByEmpresaIdG =
  IGenericResponse<IRepresentanteGetByEmpresaId>;

type IRepresentanteGetByEmpresaIdGP = Promise<IRepresentanteGetByEmpresaIdG>;

export type {
  IRepresentanteByIdsGet,
  IRepresentanteByIdsGetG,
  IRepresentanteByIdsGetGP,
  IRepresentanteGetByEmpresaIdG,
  IRepresentanteGetByEmpresaIdGP,
  IRepresentanteResponse,
};
