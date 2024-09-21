import { IEmpresaInternaGet } from '@shared/interfaces/api/IEmpresaInterna/IEmpresaInternaGet';
import { IAnalista } from '@shared/interfaces/IAnalista';
import {
  ILibradoLibrador,
  IPrecioTarificadorOp,
} from '@shared/interfaces/IPrecio';

import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import { IEnum } from '../../Legacy/IEnum';

import {
  IOperacionByIdGet,
  IOperacionByIdGetG,
  IOperacionByIdGetGP,
  IOperacionByIdGetP,
} from './IOperacionByIdGet';

interface IOperacionGetByEstudioId {
  id: string;
  analista: IAnalista;
  cantidadDocumentacionRequerida: number;
  confirmada: boolean;
  empresaInterna: IEmpresaInternaGet;
  estado: IEnum;
  estadoVerificacionEfectos: IEnum;
  fechaAsignacionAnalista: string;
  fechaCierre: string;
  fechaConfirmacion: string;
  fechaValor: string;
  importeNominal: number;
  numero: number;
  plazoMedio: number;
  porcentajeComision: number;
  porcentajeInteres: number;
  porcentajeRetencion: number;
  productoNombre: string;
}

type IOperacionGetByEstudioIdG = IGenericResponse<IOperacionGetByEstudioId>;

type IOperacionGetByEstudioIdGP = Promise<IOperacionGetByEstudioIdG>;

interface IOperacionVistaPreciosById {
  estado: IEnum;
  fechaValor: Date | string;
  librador: ILibradoLibrador;
  numero: string;
  precioSolicitado: IPrecioTarificadorOp;
  precioValido: IPrecioTarificadorOp;
}

type IOperacionVistaPreciosByIdP = Promise<IOperacionVistaPreciosById>;

interface IOperacionGetResumenById {
  id: string;
  analista: IAnalista;
  confirmada: boolean;
  efectosCantidad: number;
  estado: IEnum;
  estadoVerificacionEfectos: IEnum;
  fechaAsignacionAnalista: Date;
  fechaCierre: Date;
  fechaConfirmacion: Date;
  fechaValor: Date;
  gestor: IAnalista;
  importes: IImportes;
  librador: ILibradoLibrador;
  numero: number;
  producto: IEnum;
}
export interface IImportes {
  importeLiquido: number;
  importeNominal: number;
  importeRetencion: number;
  importeTotalGastos: number;
}

interface IOperacionEstadoPut {
  id: string;
  estado: number;
  motivo?: string;
}

type IOperacionGetResumenByIdGP = Promise<IOperacionGetResumenById>;

export type {
  IOperacionByIdGet,
  IOperacionByIdGetG,
  IOperacionByIdGetGP,
  IOperacionByIdGetP,
  IOperacionEstadoPut,
  IOperacionGetByEstudioId,
  IOperacionGetByEstudioIdG,
  IOperacionGetByEstudioIdGP,
  IOperacionGetResumenById,
  IOperacionGetResumenByIdGP,
  IOperacionVistaPreciosById,
  IOperacionVistaPreciosByIdP,
};
