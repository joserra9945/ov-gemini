export interface ITarificadorPreciosOperacionByImportesPost {
  importes: ImportesGastosGestion;
  id: string;
  precioEfectos: PrecioEfecto[];
}

export interface ImportesGastosGestion {
  importeGastosBurofaxes: number;
  importeGastosComisionEstudio: number;
  importeGastosMarketing: number;
  importeGastosRai: number;
  importeGastosTransferencias: number;
}

export interface PrecioEfecto {
  efectoId: string;
  porcentajeComision: number | undefined;
  porcentajeInteres: number | undefined;
  porcentajeTiron: number | null;
}

export interface ITarificadorPreciosOperacionByImportesPostResponse {
  efectos: Efectos[];
  importeComision: number;
  importeInteres: number;
  importeLiquido: number;
  importeNominal: number;
  importeOtrosGastos: number;
  importeOtrosGastosEfectos: number;
  importeRetencion: number;
  importesGastosGestion: ImportesGastosGestion;
  importeTotalGastos: number;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  numero: string;
  pc: number;
  pi: number;
  plazoMedio: number;
  porcentajeComision: number;
  porcentajeInteres: number;
}

interface Efectos {
  id: string;
  fechaEmision: Date;
  fechaVencimiento: Date;
  importeNominal: number;
  importes: Importes;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  numero: string;
  tipoDocumentoNombre: string;
}

export interface Importes {
  importeComision: number;
  importeInteres: number;
  importeOtrosGastos: number;
  importeRetencion: number;
  porcentajeComision: number;
  porcentajeInteres: number;
  porcentajeTiron: number;
}
