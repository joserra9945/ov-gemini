import { IImpago } from '@shared/interfaces/IImpago';

import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IEnumNombreCompleto } from '@shared/interfaces/Legacy/IEnum/IEnum';
import { ILibradoLibrador } from '@shared/interfaces/Legacy/ILibradoLibrador';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import {
  IPagareByPrestamoIdGet,
  IPagareByPrestamoIdGetG,
  IPagareByPrestamoIdGetGP,
} from './IPagareByPrestamoIdGet';
import { IPagarePrestamoPost } from './IPagarePrestamoPost';

interface IPagareGetByFilters {
  id: string;
  creationTime: string | Date;
  lastModificationTime: string | Date;
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
  estadoFinanciacionFecha: string | Date;
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
  estadoFinanciacionUsuario: string;
  estadoRevisionFecha: string | Date;
  estadoRevisionPrevio: IEnum;
  estadoRevisionUsuario: string;
  fechaExtraccionDeRemesa: string | Date;
  fechaInsercionEnRemesa: string | Date;
  motivoEstadoDeFinanciacionMensaje: string;
  nombreCompletoAnalista: string;
  operacionEstado: IEnum;
  operacionFecha: string | Date;
  operacionId: string;
  operacionNumero: number;
  scoring: string;
  tieneDevolucion: boolean;
  esALaOrden: boolean;
  esTruncable: boolean;
  iban: string;
  lugarEmision: string;
  tieneFacturas: boolean;
}

interface IPagareByDevolucionDePagareFilters {
  id: string;
  devolucion: {
    id: string;
    estado: IEnum;
    lastModificationTime: string | Date;
    usuarioUltimaModificacion: IEnumNombreCompleto;
  };
  fechaEmision: string;
  fechaVencimiento: string;
  importeNominal: number;
  librado: ILibradoLibrador;
  librador: {
    id: string;
    razonSocial: string;
    gestor: IEnumNombreCompleto;
  };
  numero: string;
}

type IPagareResumenByOperacionId = {
  id: string;
  creationTime: Date;
  confirmado: boolean;
  estadoFinanciacion: IEnum;
  estudioId: string;
  facturasPagareNumero?: number;
  fechaEmision: Date;
  fechaVencimiento: Date;
  importeNominal: number;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  motivoEstadoDeFinanciacionDescripcion: string;
  numero: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
};

interface IPagareByRemesaFilters {
  id: string;
  creationTime: Date;
  confirmado: boolean;
  delegacion: IEnum;
  empresaInternaCodigo: string;
  estadoFinanciacion: IEnum;
  fechaCobro: Date;
  fechaVencimiento: Date;
  importeNominal: number;
  importeRetencion: number;
  instrumento: string;
  numero: string;
  operacionNumero: string;
  remesaBancariaNumero: number;
  ventaAFondoNumero: number;
  confirmada: boolean;
  impago: IImpago;
  librado: { cif: string; gestor: string; id: string; razonSocial: string };
  librador: { cif: string; gestor: string; id: string; razonSocial: string };
}

interface IFacturaDetallesByFiltersGet {
  fechaEmision: string;
  idExterno: string;
  importeNominal: number;
  numero: string;
}

interface IPagareConciliable {
  id: string;
  asignadoFront: number;
  importeADevolverFront: number;
  comisionFront: number;
  gastosNotariaFront: number;
  otrosGastosFront: number;
  fechaEmision: string;
  fechaVencimiento: string;
  importeCobrado: number;
  importeNominal: number;
  importePendienteCobro: number;
  libradorRazonSocial: string;
  numero: string;
  operacionNumero: number;
}

type IFacturaDetallesByFiltersGetG =
  IGenericResponse<IFacturaDetallesByFiltersGet>;
type IFacturaDetallesByFiltersGetGP = Promise<IFacturaDetallesByFiltersGetG>;

type IPagareResumenByOperacionIdG =
  IGenericResponse<IPagareResumenByOperacionId>;
type IPagareResumenByOperacionIdGP = Promise<IPagareResumenByOperacionIdG>;

type IPagareGetByFiltersG = IGenericResponse<IPagareGetByFilters>;
type IPagareGetByFiltersGP = Promise<IPagareGetByFiltersG>;

type IPagareByDevolucionDePagareFiltersG =
  IGenericResponse<IPagareByDevolucionDePagareFilters>;
type IPagareByDevolucionDePagareFiltersGP =
  Promise<IPagareByDevolucionDePagareFiltersG>;

type IPagareByIdGet = IPagareGetByFilters;
type IPagareByIdGetP = Promise<IPagareByIdGet>;

type IPagareByRemesaFiltersG = IGenericResponse<IPagareByRemesaFilters>;
type IPagareByRemesaFiltersGP = Promise<IPagareByRemesaFiltersG>;

type IPagareConciliableG = IGenericResponse<IPagareConciliable>;
type IPagareConciliableGP = Promise<IPagareConciliableG>;

export type {
  IFacturaDetallesByFiltersGet,
  IFacturaDetallesByFiltersGetG,
  IFacturaDetallesByFiltersGetGP,
  IPagareByDevolucionDePagareFilters,
  IPagareByDevolucionDePagareFiltersG,
  IPagareByDevolucionDePagareFiltersGP,
  IPagareByIdGet,
  IPagareByIdGetP,
  IPagareByPrestamoIdGet,
  IPagareByPrestamoIdGetG,
  IPagareByPrestamoIdGetGP,
  IPagareByRemesaFilters,
  IPagareByRemesaFiltersG,
  IPagareByRemesaFiltersGP,
  IPagareConciliable,
  IPagareConciliableG,
  IPagareConciliableGP,
  IPagareGetByFilters,
  IPagareGetByFiltersG,
  IPagareGetByFiltersGP,
  IPagarePrestamoPost,
  IPagareResumenByOperacionId,
  IPagareResumenByOperacionIdG,
  IPagareResumenByOperacionIdGP,
};
