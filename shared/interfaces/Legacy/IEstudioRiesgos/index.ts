import { IOperacionGetByFilters } from '@shared/interfaces/api';
import { IGestor } from '@shared/modules/PerfilEmpresa/interfaces';

import { IGenericResponse } from '@shared/components/Legacy/TurboTable/example/interfaces';

import { IAnalista } from '../IAnalista';
import { IEnum } from '../IEnum';
import { IPrecioSolicitud } from '../IprecioSolicitud';

export interface IEstudioRiesgos {
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

export type IEstudioRiesgosGenericResponse = IGenericResponse<IEstudioRiesgos>;
