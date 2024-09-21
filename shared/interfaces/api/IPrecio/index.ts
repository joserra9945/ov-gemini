import { IEnum } from 'interfaces/IEnum';
import { IUltimoPrecio } from 'interfaces/IOperaciones';

import { IEmpresaInternaGet } from '../IEmpresaInterna';

export interface ILibradoLibrador {
  id: string;
  razonSocial: string;
  cif?: string;
}

interface IPrecioPorcentajeCesion {
  porcentajeComision: number;
  porcentajeInteres: number;
}

interface ICuentaInterna {
  bicSwift: string;
  codigo: string;
  cuentaContable: string;
  entidadBancariaId: string;
  entidadBancariaNombre: string;
  ibanCompleto: string;
  id: string;
  lastModificationTime: string;
  tayaId: number;
  titulares: string[];
  verificada: boolean;
}

export interface IPorcentajes {
  comision: IImportesPorcen;
  interes: IImportesPorcen;
  retencion: IImportesPorcen;
  tiron: number;
}

interface IImportesPorcen {
  importe?: number | string;
  porcentaje?: number;
}

export interface IPrecioAcordadoEfecto {
  efectoFechaEmision: string;
  efectoFechaVencimiento: string;
  efectoId: string;
  efectoImporteNominal: number;
  efectoLibradoId: string;
  efectoLibradoRazonSocial: string;
  efectoLibradoScoring: string;
  efectoNumero: string;
  importesSolicitados: IPorcentajes;
  importesValidos: IPorcentajes;
  porcentajes?: IPrecioPorcentajes;
}

interface IPrecioPorcentajes {
  porcentajeComision: number | null;
  porcentajeInteres: number | null;
  porcentajeRetencion: number | null;
  porcentajeTiron: number | null;
}

export interface IPrecioEfecto {
  fechaEmision: string;
  fechaVencimiento: string;
  id: string;
  importeComision: number;
  importeInteres: number;
  importeNominal: number;
  importePendienteCobro: number;
  importeCobrado: number;
  importeOtrosGastos: number;
  importeRetencion: number;
  libradoCif: string;
  libradoRazonSocial: string;
  libradoId: string;
  libradorId: string;
  numero: string;
  porcentajes: IPrecioPorcentajes;
  tipoDocumentoEnum: number;
  tipoDocumentoNombre: string;
}

interface IPrecioTarificadorCesion {
  importeComision?: number;
  importeGastosBurofaxes?: number;
  importeGastosComisionEstudio?: number;
  importeGastosMarketing?: number;
  importeGastosRai?: number;
  importeGastosTransferencias?: number;
  importeInteres?: number;
  importeLiquido?: number;
  importeNominal?: number;
  importeOtrosGastos?: number;
  importeOtrosGastosEfectos?: number;
  importeRetencion?: number;
  importeTotalGastos?: number;
  pc?: number;
  pi?: number;
}
interface IPrecioTarificadorOp {
  importeComision?: number;
  importeGastosBurofaxes?: number;
  importeGastosComisionEstudio?: number;
  importeGastosGestion?: number;
  importeGastosMarketing?: number;
  importeGastosRai?: number;
  importeGastosTransferencias?: number;
  importeInteres?: number;
  importeLiquido?: number;
  importeNominal?: number;
  importeOtrosGastos?: number;
  importeOtrosGastosEfectos?: number;
  importeRetencion?: number;
  importeTotalGastos?: number;
  pc?: number;
  pi?: number;
  plazoMedio?: number;
  porcentajeComision?: number;
  porcentajeInteres?: number;
  porcentajeRetencion?: number;
}

export interface IPreciosTarificadorCesion {
  final: IPrecioTarificadorCesion;
  inicial: IPrecioTarificadorCesion;
  solicitado: IPrecioTarificadorCesion;
}

export interface IPrecio {
  concepto: string;
  cuentaInterna: ICuentaInterna;
  cuentaInternaId: string;
  destinos: string[];
  empresaInternaCodigo: string;
  empresaInternaId: string;
  empresaInternaRazonSocial: string;
  fecha: string;
  id: string;
  importe: number;
  importePendiente: number;
  lastModificationTime: string;
  origen: number;
  origenNombre: string;
  tayaId: number;
  [key: string]: any;
  estudioId?: string;
}

interface IOtrosGastos {
  importeGastosBurofaxes: number;
  importeGastosComisionEstudio: number;
  importeOtrosGastosEfectos: number;
  importeGastosMarketing: number;
  importeGastosOtros: number;
  importeGastosRai: number;
  importeGastosTransferencias: number;
}

export interface IPrecioSolicitud {
  id: string;
  porcentajeComision: number;
  porcentajeInteres: number;
  porcentajeRetencion: number;
  porcentajeTiron?: number;
  descripcionConfirmacion: string;
  descripcionSolicitud: string;
  estado: number;
  estadoNombre: string;
  estudioId: string;
  fechaConfirmacion: string;
  fechaSolicitud: string;
  sinGastos: boolean;
  sinRecurso: boolean;
  usuarioConfirmacion: string;
  usuarioSolicitud: string;
  libradorRazonSocial: string;
  libradoRazonSocial: string;
  libradorCif: string;
  libradoCif: string;
  libradorId: string;
  libradoId: string;
  libradorScoring: string;
  libradoScoring: string;
  productoNombre: string;
  importesGastosGestion: IOtrosGastos;
}

export interface IPrecioCesion {
  id: string;
  empresaInterna: IEmpresaInternaGet;
  estado: IEnum;
  estadoFirma: IEnum;
  estadoUltimoPrecio: IEnum;
  importe: number;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
  porcentajeComision: number;
  porcentajeInteres: number;
  porcentajeRetencion: number;
  tipo: IEnum;
}

export interface IPrecioCesionById {
  id: string;
  estado: IEnum;
  estadoFirma: IEnum;
  importe: number;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
  precioSolicitado: IPrecioPorcentajeCesion;
  precioValido: IPrecioPorcentajeCesion;
  tipo: IEnum;
  ultimoPrecio: IUltimoPrecio;
}

export interface IPrecioOperacionById {
  id?: string;
  estado?: IEnum;
  fechaValor?: Date | string;
  librador?: ILibradoLibrador;
  numero?: string;
  precioSolicitado?: IPrecioTarificadorOp;
  precioValido?: IPrecioTarificadorOp;
}

export interface IPrecioCesionCustom {
  id: string;
  tipoImporte: string;
  precioInicial: number;
  precioSolicitado: number;
  precioFinal: number;
}
