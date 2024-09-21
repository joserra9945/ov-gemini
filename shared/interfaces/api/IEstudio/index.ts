import { ILibradoLibrador } from '@shared/interfaces/IPrecio';
import { IGestor } from '@shared/modules/PerfilEmpresa/interfaces';

import { IAnalista } from '@shared/interfaces/Legacy/IAnalista';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IPrecioSolicitud } from '@shared/interfaces/Legacy/IprecioSolicitud';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import { IOperacionGetByFilters } from '../IOperacion/IOperacionByFiltersGet';

import {
  IEstudioAnotacionesByFiltersGet,
  IEstudioAnotacionesByFiltersGetG,
  IEstudioAnotacionesByFiltersGetGP,
} from './IEstudioAnotacionesByFilters';

interface IEstudioByIdGet {
  creationTime: string;
  efectosPlazoMedio: number;
  empresaInternaId: string;
  empresaInternaRazonSocial: string;
  empresaInternaCodigo?: string;
  estado: IEnum;
  estadoFinanciacion: IEnum;
  fechaAsignacionAnalista: string;
  fechaCierre: string;
  fechaUltimoEstado: string;
  id: string;
  importeNominal: number;
  importeNominalAprobado: number;
  lastModificationTime: string;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  libradoScoring: string;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  libradorScoring: string;
  operacionId: string | null;
  productoId: number;
  productoNombre: string;
  analista: IAnalista;
  precioAcordado: IPrecioSolicitud;
  precioSolicitado: IPrecioSolicitud;
  numero: number;
  operaciones: IOperacionGetByFilters[];
  gestor: IGestor;
  numeroAlertaPendientes: number;
  estadoVerificacionEfectos: IEnum;
  tieneOperaciones?: boolean;
  tipo: IEnum;
}

type IEstudioByIdGetP = Promise<IEstudioByIdGet>;

export interface IEstudioByFiltersGet {
  id: string;
  creationTime: Date;
  alertasPrasRevisadas: boolean;
  analista: IAnalista;
  estado: IEnum;
  estadoFinanciacion: IEnum;
  estadoVerificacionEfectos: IEnum;
  fechaAsignacionAnalista: Date;
  fechaCierre: Date;
  fechaUltimoEstado: Date;
  gestor: IAnalista;
  importeNominal: number;
  importeNominalAprobado: number;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
  numero: number;
  tipo: IEnum;
  tieneOperaciones: boolean;
  tieneDirectLendings: boolean;
}
type IEstudioByFiltersGetG = IGenericResponse<IEstudioByFiltersGet>;
type IEstudioByFiltersGetGP = Promise<IEstudioByFiltersGetG>;

export type {
  IEstudioAnotacionesByFiltersGet,
  IEstudioAnotacionesByFiltersGetG,
  IEstudioAnotacionesByFiltersGetGP,
  IEstudioByFiltersGetG,
  IEstudioByFiltersGetGP,
  IEstudioByIdGet,
  IEstudioByIdGetP,
};
