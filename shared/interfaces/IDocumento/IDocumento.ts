import { IInputIban } from '@shared/components/Legacy/CustomInputs/InputIban/interface';

import { IPersona } from '../IPersona';
import { ILibradoLibrador } from '../IPrecio';
import { ICuentaTitulares } from '../ITitulares/ITitulares';
import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface IDocumento
  extends IDocumentoRepresentante,
    IDocumentoCuenta,
    IDocumentoCesion {
  id: string;
  cesionId?: string;
  cesionNumero?: string;
  detalle: string;
  creationTime?: string;
  lastModificationTime?: string;
  estadoRevisionDescripcion?: string;
  esALaOrden?: boolean;
  esFicticio?: boolean;
  esRecorte?: boolean;
  esTruncable?: boolean;
  esFacturaDePagare?: boolean;
  estadoFirma?: IEnum;
  estadoRevision?: IEnum;
  estadoRevisionId?: number;
  estadoRevisionNombre?: string;
  fechaPrimeraRecepcion?: string;
  fechaFirma?: string | Date;
  fechaEmision?: string | Date;
  fechaVencimiento?: string | Date;
  hasFichero?: boolean;
  libradorCif?: string;
  libradorId?: string;
  libradorRazonSocial?: string;
  motivoDocumentoRechazado?: string;
  motivoRechazo?: string;
  numero?: string | number;
  operacionNumero?: string;
  origen?: number;
  pdfFicheroId?: string;
  ficheroPdfId?: string;
  tieneSolicitudCambioImagen?: boolean;
  tipo?: IEnum;
  tipoDocumentoId?: number;
  tipoDocumentoNombre?: string;
  trazaId?: string;
  usuarioValidadorNombre?: string;
  libradoRazonSocial?: string;
  usuarioValidadorId?: string;
  tieneSolicitudCambioFichero?: boolean;
  estadoRevisionPrevio?: IEnum;
  producto: IEnum;
  productoTxt?: string;
  confirmado?: boolean;
  descripcionEstadoRevisionPrevio?: string;
  descripcionEstadoRevision?: string;
  pendienteValidar?: boolean;
  efectoId?: string;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
}

export interface IDocumentoRepresentante {
  id?: string;
  cargo?: IEnum;
  descripcionEstadoCargo?: string;
  descripcionEstadoDni?: string;
  estadoCargo?: IEnum;
  estadoDni?: IEnum;
  numeroDni?: string;
  persona?: IPersona;
}

export interface IDocumentoCuenta {
  activa?: boolean;
  entidadBancaria?: {
    bic: string;
    codigo: string;
    id: string;
    nombre: string;
  };
  iban?: string | IInputIban | any;
  empresaId?: string;
  empresaRazonSocial?: string;
  estado?: IEnum;
  fechaUltimoEstado?: string | Date;
  motivoErrorVerificacion?: string;
  titulares?: ICuentaTitulares[];
}

export interface IDocumentoCesion {
  descripcion?: string;
  documentosDeCesionAmount?: number;
  empresaInternaCodigo?: string;
  empresaInternaId?: string;
  esConClausula24?: true;
  esSinComunicar?: true;
  esSinRecurso?: true;
  estado?: IEnum;
  estadoFirma?: IEnum;
  fechaDeFirma?: string | Date;
  importe?: number;
  libradoCif?: string;
  libradoId?: string;
  libradoRazonSocial?: string;
  libradorCif?: string;
  libradorId?: string;
  libradorRazonSocial?: string;
  porcentajeComision?: number;
  porcentajeInteres?: number;
  porcentajeRetencion?: number;
  fechaFinalizacionContrato?: string | Date;
  fechaFinalizacion?: string | Date;
  fechaFirmaAnteNotario?: string | Date;
  fechaFirmaDigital?: string | Date;
  fechaUltimoEstado?: string | Date;
  fechaInicioContrato?: string | Date;
  fechaInicio?: string | Date;
  numero?: string | number;
  plazoFinalizacionId?: number;
  tipo?: IEnum;
  firmaNotarialId?: string;
  validada?: boolean;
  hasFirma?: boolean;
}

export type IDocumentoGenericResponse = IGenericResponse<IDocumento>;
