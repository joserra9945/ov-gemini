export interface IOperacionAprobarPrecioPut {
  id: string;
  descripcion: string;
  importes: ImportesGastosGestion;
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
