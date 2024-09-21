type IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoIdGet = {
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
  empresaInternaCodigo: string;
  estadoOperacion: number;
  estadoOperacionNombre: string;
  operacionId: string;
  operacionNumero: string;
};

type IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoIdGetP =
  Promise<IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoIdGet>;

export type {
  IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoIdGet,
  IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoIdGetP,
};
