import { IDocumento } from '@shared/interfaces/IDocumento/IDocumento';
import { IEmpresas } from '@shared/interfaces/IEmpresas';
import { IImpago } from '@shared/interfaces/IImpago';

import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import { IRetencionResponse } from '../IRetencion';
import { IVentaAFondoEnum } from '../IVentaFondo';

import {
  IEfectoByGestionFiltersGet,
  IEfectoByGestionFiltersGetG,
  IEfectoByGestionFiltersGetGP,
} from './IEfectoByGestionFiltersGet';
import {
  IEfectoByIngresoIdExternoGet,
  IEfectoByIngresoIdExternoGetG,
  IEfectoByIngresoIdExternoGetGP,
} from './IEfectoByIngresoIdExternoGet';
import { IEfectoPrecioByOperacionGet } from './IEfectoPrecioByOperacionGet';

interface IEfectoDocumentacionRequeridaByEstudioIdGet {
  id: string;
  detalle: string;
  documentoRechazadoId: string;
  documentoSubido: {
    id: string;
    creationTime: string;
    estadoRevision: IEnum;
  };
  efecto: {
    id: string;
    numero: string;
    tipo: string;
  };
  estadoValoracion: IEnum;
  operacionNumero: number;
  pendiente: boolean;
  tieneAnotacionesValoracion: boolean;
  tipoDocumento: IEnum;
}

interface IEfectoRevisablesByEstudioIdGet {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaVencimiento: string;
  hasFichero: boolean;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  trazaId: string;
  usuarioValidadorId: string;
  usuarioValidadorNombre: string;
  cesionId: string;
  estadoEfectoClienteId: number;
  estadoEfectoClienteNombre: string;
  estadoVerificacion: IEnum;
  estudioId: string;
  estudioNumero: number;
  fechaEmision: string;
  importeNominal: number;
  importePendienteCobro: number;
  instrumento: string;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  numero: string;
  verificadoPorLibrado: boolean;
  confirmado: boolean;
  documentosPendientesAmount: number;
  estadoFinanciacionFecha: string;
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
  estadoFinanciacionUsuario: string;
  estadoRevisionFecha: string;
  estadoRevisionPrevio: IEnum;
  estadoRevisionUsuario: string;
  fechaExtraccionDeRemesa: string;
  fechaInsercionEnRemesa: string;
  motivoEstadoDeFinanciacionMensaje: string;
  nombreCompletoAnalista: string;
  operacionEstado: IEnum;
  operacionFecha: string;
  operacionId: string;
  operacionNumero: number;
  scoring: string;
  tieneDevolucion: boolean;
  tieneFacturas: boolean;
  esALaOrden: boolean;
  esTruncable: boolean;
}

interface IEfectoEstadoFinanciacionPut {
  descripcion?: string;
  estadoFinanciacion: number;
  ids: string[];
  motivoEstadoDeFinanciacionId?: number;
}

interface IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGet {
  id: string;
  detalle: string;
  documentoRechazadoId: string;
  documentoSubido: {
    id: string;
    creationTime: string;
    estadoRevision: IEnum;
  };
  efecto: {
    id: string;
    numero: string;
    tipo: string;
  };
  estadoValoracion: IEnum;
  pendiente: boolean;
  tieneAnotacionesValoracion: boolean;
  tipoDocumento: IEnum;
}

export interface IEfecto extends IDocumento {
  id: string;
  lastModificationTime?: string;
  creationTime: string;
  estadoRevisionDescripcion?: string;
  esALaOrden?: boolean;
  esTruncable?: boolean;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionId: number;
  estadoRevisionNombre?: string;
  estudioNumero?: string;
  motivoDocumentoRechazado?: string;
  origen?: number;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre?: string;
  trazaId?: string;
  efectoNumero?: string;
  estadoEfectoClienteId: number;
  estadoEfectoClienteNombre?: string;
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
  fechaEmision?: string;
  fechaVencimiento: string;
  hasFichero?: boolean;
  importeNominal: number;
  importeRetencion?: number;
  instrumento?: string;
  libradoCif?: string;
  libradoId: string;
  libradoRazonSocial?: string;
  libradorCif?: string;
  libradorId: string;
  libradorRazonSocial?: string;
  numero?: string;
  tipoDocumento: IEnum;
  nombreCompletoAnalista?: string;
  estadoFinanciacion: IEnum;
  documentosPendientesAmount: number;
  estudioId: string;
  scoring?: string;
  operacionId?: string;
  operacionNumero?: string;
  operacionTrazaId?: string;
  operacionEstado?: IEnum;
  associatedPagare?: string;
  importePendienteCobro?: number;
  tieneFacturas?: boolean;
  tienePagares?: boolean;
  tipoId: number;
  detalle: string;
  documentoRechazadoId: string;
  efectoId: string;
  fechaRequerimiento: string;
  motivoRechazo: string;
  pendiente: boolean;
  cesionId?: string;
  confirmado?: boolean;
  motivoEstadoDeFinanciacionMensaje?: string;
  verificadoPorLibrado?: boolean;
  estadoVerificacion?: IEnum;
  estadoFinanciacionUsuario?: string;
  fechaImpago?: string;
  estadoOperacion?: IEnum;
  facturasPagareNumero?: number;
  asignadoFront?: number;
  fechaUltimoCobro?: string;
  importeRetencionPagado?: number;
  operacionFechaValor?: string;
  fechaCobro?: string;
  tieneDevolucion?: boolean;
  tipoDocumentoEnum?: number;
  librado: IEmpresas;
}

interface IEfectoByOperacionIdGet {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaVencimiento: string;
  hasFichero: boolean;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  trazaId: string;
  usuarioValidadorId: string;
  usuarioValidadorNombre: string;
  cesionId: string;
  estadoEfectoClienteId: number;
  estadoEfectoClienteNombre: string;
  estadoVerificacion: IEnum;
  estudioId: string;
  estudioNumero: number;
  fechaEmision: string;
  importeNominal: number;
  importePendienteCobro: number;
  instrumento: string;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  numero: string;
  verificadoPorLibrado: boolean;
  confirmado: boolean;
  documentosPendientesAmount: number;
  estadoFinanciacionFecha: string;
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
  estadoFinanciacionUsuario: string;
  estadoRevisionFecha: string;
  estadoRevisionPrevio: IEnum;
  estadoRevisionUsuario: string;
  fechaExtraccionDeRemesa: string;
  fechaInsercionEnRemesa: string;
  motivoEstadoDeFinanciacionMensaje: string;
  nombreCompletoAnalista: string;
  operacionEstado: IEnum;
  operacionFecha: string;
  operacionId: string;
  operacionNumero: number;
  scoring: string;
  tieneDevolucion: boolean;
}

interface IEfectoDocumentacionRequeridaPendienteByOperacionId {
  id: string;
  detalle: string;
  documentoRechazadoId: string;
  efectoId: string;
  efectoNumero: string;
  fechaRequerimiento: string;
  motivoRechazo: string;
  operacionNumero: string;
  pendiente: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
}

interface IEfectoByFilters {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaVencimiento: string;
  hasFichero: boolean;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  trazaId: string;
  usuarioValidadorId: string;
  usuarioValidadorNombre: string;
  cesionId: string;
  estadoEfectoClienteId: number;
  estadoEfectoClienteNombre: string;
  estadoVerificacion: IEnum;
  estudioId: string;
  estudioNumero: number;
  fechaEmision: string;
  importeNominal: number;
  importePendienteCobro: number;
  instrumento: string;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  numero: string;
  verificadoPorLibrado: boolean;
  confirmado: boolean;
  documentosPendientesAmount: number;
  estadoFinanciacionFecha: string;
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
  estadoFinanciacionUsuario: string;
  estadoRevisionFecha: string;
  estadoRevisionPrevio: IEnum;
  estadoRevisionUsuario: string;
  fechaExtraccionDeRemesa: string;
  fechaInsercionEnRemesa: string;
  motivoEstadoDeFinanciacionMensaje: string;
  nombreCompletoAnalista: string;
  operacionEstado: IEnum;
  operacionFecha: string;
  operacionId: string;
  operacionNumero: number;
  scoring: string;
  tieneDevolucion: boolean;
  impago: IImpago;
  importeRetencionPagado: string;
  fechaCobro: string;
  ventaAFondo: IVentaAFondoEnum;
  fechaUltimoCobro: string;
}

interface IEfectoById {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaVencimiento: string;
  hasFichero: boolean;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  trazaId: string;
  usuarioValidadorId: string;
  usuarioValidadorNombre: string;
  cesionId: string;
  estadoEfectoClienteId: number;
  estadoEfectoClienteNombre: string;
  estadoVerificacion?: IEnum;
  estudioId: string;
  estudioNumero: number;
  fechaEmision: string;
  importeNominal: number;
  importePendienteCobro: number;
  instrumento: string;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  numero: string;
  verificadoPorLibrado: boolean;
  confirmado: boolean;
  documentosPendientesAmount: number;
  estadoFinanciacionFecha: string;
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
  estadoFinanciacionUsuario: string;
  estadoRevisionFecha: string;
  estadoRevisionPrevio: IEnum;
  estadoRevisionUsuario: string;
  fechaUltimoCobro: string;
  impago: IImpago;
  motivoEstadoDeFinanciacionMensaje: string;
  nombreCompletoAnalista: string;
  operacionEstado: IEnum;
  operacionFecha: string;
  operacionId: string;
  operacionNumero: number;
  retencion: IRetencionResponse;
  scoring: string;
  tieneDevolucion: boolean;
  ventaAFondo: IVentaAFondoEnum;
  fechaCobro?: string;
}
interface IEstadosVerificacionByEstudioId {
  estadosVerificacion: EstadosVerificacion[];
  operacionNumero: number;
}

export type EstadosVerificacion = {
  description: string;
  id: number;
  cantidad: number;
};

interface IEstadosVerificacionByOperacionId {
  description: string;
  id: number;
  cantidad: number;
}

type IEstadosVerificacionByOperacionIdP = Promise<
  IEstadosVerificacionByOperacionId[]
>;
type IEstadosVerificacionByEstudioIdP = Promise<
  IEstadosVerificacionByEstudioId[]
>;
type IEfectoDocumentacionRequeridaPendienteByOperacionIdG =
  IGenericResponse<IEfectoDocumentacionRequeridaPendienteByOperacionId>;
type IEfectoDocumentacionRequeridaPendienteByOperacionIdGP =
  Promise<IEfectoDocumentacionRequeridaPendienteByOperacionIdG>;
type IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetG =
  IGenericResponse<IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGet>;
type IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetGP =
  Promise<IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetG>;
type IEfectoEstadoFinanciacionPutP = Promise<IEfectoEstadoFinanciacionPut>;
type IEfectoRevisablesByEstudioIdGetG =
  IGenericResponse<IEfectoRevisablesByEstudioIdGet>;
type IEfectoRevisablesByEstudioIdGetGP =
  Promise<IEfectoRevisablesByEstudioIdGetG>;
type IEfectoDocumentacionRequeridaByEstudioIdGetG =
  IGenericResponse<IEfectoDocumentacionRequeridaByEstudioIdGet>;
type IEfectoDocumentacionRequeridaByEstudioIdGetGP =
  Promise<IEfectoDocumentacionRequeridaByEstudioIdGetG>;
type IEfectoByOperacionIdGetG = IGenericResponse<IEfectoByOperacionIdGet>;
type IEfectoByOperacionIdGetGP = Promise<IEfectoByOperacionIdGetG>;
type IEfectoByIdGetG = IGenericResponse<IEfectoById>;
type IEfectoByIdGetGP = Promise<IEfectoByIdGetG>;
type IEfectoByIdP = Promise<IEfectoById>;
type IEfectoByFiltersGetG = IGenericResponse<IEfectoByFilters>;
type IEfectoByFiltersGetGP = Promise<IEfectoByFiltersGetG>;
type IEfectoPrecioByOperacionGetG =
  IGenericResponse<IEfectoPrecioByOperacionGet>;
type IEfectoPrecioByOperacionGetP = Promise<IEfectoPrecioByOperacionGet>;
type IEfectoPrecioByOperacionGetGP = Promise<IEfectoPrecioByOperacionGetG>;

export type {
  IEfectoByFilters,
  IEfectoByFiltersGetG,
  IEfectoByFiltersGetGP,
  IEfectoByGestionFiltersGet,
  IEfectoByGestionFiltersGetG,
  IEfectoByGestionFiltersGetGP,
  IEfectoById,
  IEfectoByIdGetG,
  IEfectoByIdGetGP,
  IEfectoByIdP,
  IEfectoByIngresoIdExternoGet,
  IEfectoByIngresoIdExternoGetG,
  IEfectoByIngresoIdExternoGetGP,
  IEfectoByOperacionIdGet,
  IEfectoByOperacionIdGetG,
  IEfectoByOperacionIdGetGP,
  IEfectoDocumentacionRequeridaByEstudioIdGet,
  IEfectoDocumentacionRequeridaByEstudioIdGetG,
  IEfectoDocumentacionRequeridaByEstudioIdGetGP,
  IEfectoDocumentacionRequeridaPendienteByOperacionId,
  IEfectoDocumentacionRequeridaPendienteByOperacionIdG,
  IEfectoDocumentacionRequeridaPendienteByOperacionIdGP,
  IEfectoEstadoFinanciacionPut,
  IEfectoEstadoFinanciacionPutP,
  IEfectoPrecioByOperacionGet,
  IEfectoPrecioByOperacionGetG,
  IEfectoPrecioByOperacionGetGP,
  IEfectoPrecioByOperacionGetP,
  IEfectoRevisablesByEstudioIdGet,
  IEfectoRevisablesByEstudioIdGetG,
  IEfectoRevisablesByEstudioIdGetGP,
  IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGet,
  IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetG,
  IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetGP,
  IEstadosVerificacionByEstudioId,
  IEstadosVerificacionByEstudioIdP,
  IEstadosVerificacionByOperacionId,
  IEstadosVerificacionByOperacionIdP,
};
