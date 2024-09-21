import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IInformeGetResumenByCif {
  fecha: string;
  importeTotal: number;
  importeTotalImpagado: number;
  numeroImpagos: number;
  numeroOperaciones: number;
  numeroOperacionesImpagadas: number;
  situacion: IEnum;
}

interface IInformeGetByCif {
  id: string;
  cif: string;
  fechaAlta: string;
  fechaMaximoImpago: string;
  fechaPeorSituacion: string;
  fechaUltimaActualizacion: string;
  fechaUltimaCompra: string;
  importeMaximoImpagado: number;
  importeTotalImpagado: number;
  numeroImpagos: number;
  numeroOperaciones: number;
  numeroOperacionesImpagadas: number;
  peorSituacion: IEnum;
  razonSocial: string;
  userIdentityId: string;
  fechaApunteMasReciente: string;
  fechaRespuesta: string;
  numeroApuntes: number;
}

interface IInformeDetalleOpGetByCif {
  entidad: IEnum;
  fecha: string;
  fechaFin: string;
  fechaInicio: string;
  importeTotalImpagado: number;
  naturaleza: IEnum;
  numeroOperacionesImpagadas: number;
  producto: IEnum;
  situacion: IEnum;
}

interface IInformeRAIGetByCif {
  id: string;
  fechaApunteMasReciente: string;
  fechaRespuesta: string;
  importeTotalImpagado: number;
  numeroApuntes: number;
  userIdentityId: string;
}

type IInformeGetResumenByCifG = IGenericResponse<IInformeGetResumenByCif>;

type IInformeGetResumenByCifGP = Promise<IInformeGetResumenByCifG>;

type IInformeGetByCifGP = Promise<IInformeGetByCif>;

type IInformeDetalleOpGetByCifG = IGenericResponse<IInformeDetalleOpGetByCif>;

type IInformeDetalleOpGetByCifGP = Promise<IInformeDetalleOpGetByCifG>;

type IInformeRAIGetByCifG = IGenericResponse<IInformeRAIGetByCif>;

type IInformeRAIGetByCifGP = Promise<IInformeRAIGetByCifG>;

export type {
  IInformeDetalleOpGetByCif,
  IInformeDetalleOpGetByCifG,
  IInformeDetalleOpGetByCifGP,
  IInformeGetByCif,
  IInformeGetByCifGP,
  IInformeGetResumenByCifG,
  IInformeGetResumenByCifGP,
  IInformeRAIGetByCif,
  IInformeRAIGetByCifG,
  IInformeRAIGetByCifGP,
};
