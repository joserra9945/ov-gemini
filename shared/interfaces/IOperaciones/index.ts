import { IEmpresa } from '@shared/interfaces/common';

import { IAnalista } from 'interfaces/IAnalista';
import { IProducto } from 'interfaces/IProducto';

import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface IOperacionTree {
  id?: string;
  numero?: number;
  producto?: IProducto;
  type?: number;
}

export interface IUltimoPrecio {
  descripcion: string;
  estado: IEnum;
  fecha: Date | string;
  nombreDeUsuario: string;
}
export interface IOperacion {
  id: string;
  confirmada?: boolean;
  descripcionEstado?: string;
  documentosPendientesAmount: number;
  efectosAceptadosPorLibrado: boolean;
  empresaInternaId: string;
  estado: IEnum;
  estadoNombre: string;
  fechaValor: string;
  fechaCierre: string | null;
  fechaConfirmacion: string | null;
  fechaAsignacionAnalista: string | null;
  importeNominal: number;
  importeLiquido: number;
  librador: IEmpresa;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  numero: number;
  plazoMedio: number;
  producto?: IProducto;
  productoId: number;
  productoNombre: string;
  trazaId: string;
  analista: IAnalista;
  cantidadDocumentacionRequerida: number;
  porcentajeComision: number;
  porcentajeInteres: number;
  porcentajeRetencion: number;
  estadoVerificacionEfectos: IEnum;
  empresaInterna: {
    id: string;
    codigo: string;
  };
}

export interface IOperacionByEstudio extends Omit<IOperacion, 'estado' | 'id'> {
  estado: {
    description: string;
    id: number;
  };
  id: string;
  empresaInterna: {
    id: string;
    codigo: string;
  };
}

export interface IOperacionGestor
  extends Omit<IOperacion, 'estado' | 'producto'> {
  estado: {
    description: string;
    id: number;
  };
  producto: {
    description: string;
    id: number;
  };
}

export interface IPrecioOperacion {
  id?: string;
  empresaInternaRazonSocial: string;
  estado: number;
  estadoLastPrecioAcordado: number;
  estadoLastPrecioAcordadoNombre: string;
  estadoNombre: string;
  fechaValor: Date;
  importeNominal: number;
  libradorRazonSocial: string;
  numero: number;
  plazoMedio: number;
  productoNombre: string;
}

export interface IOperacionActivaPrecio {
  id?: string;
  confirmada?: boolean;
  estado?: IEnum;
  fechaValor?: Date | string;
  importeNominal?: number;
  numero?: number | string;
  plazoMedio?: number;
  productoNombre?: string;
}

export type IOperacionActivaPrecioGenericResponse =
  IGenericResponse<IOperacionActivaPrecio>;

export interface IOperacionResumen {
  id: string;
  analista: {
    id: string;
    identityId: string;
    nombreDeUsuario: string;
  };
  confirmada: boolean;
  efectosCantidad: number;
  estado: {
    description: string;
    id: number;
  };
  estadoVerificacionEfectos: {
    description: string;
    id: number;
  };
  fechaAsignacionAnalista: string;
  fechaCierre: string;
  fechaConfirmacion: string;
  fechaValor: string;
  gestor: {
    id: string;
    identityId: string;
    nombreDeUsuario: string;
  };
  importes: {
    importeLiquido: number;
    importeNominal: number;
    importeRetencion: number;
    importeTotalGastos: number;
  };
  librador: {
    cif: string;
    id: string;
    razonSocial: string;
  };
  numero: number;
  producto: {
    description: string;
    id: number;
  };
}

export interface IPrecioOperacionByFilters {
  id: string;
  empresaInternaCodigo: string;
  estado: IEnum;
  fechaValor: Date | string;
  importeNominal: number;
  libradorRazonSocial: string;
  numero: number;
  plazoMedio: number;
  producto: IEnum;
  ultimoPrecio: IUltimoPrecio;
}

export type IOperacionesGenericResponse = IGenericResponse<IOperacion>;
export type IPrecioOperacionByFiltersGenericResponse =
  IGenericResponse<IPrecioOperacionByFilters>;
