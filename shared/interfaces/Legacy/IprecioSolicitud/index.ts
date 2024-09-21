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

interface IOtrosGastos {
  importeGastosBurofaxes: number;
  importeGastosComisionEstudio: number;
  importeOtrosGastosEfectos: number;
  importeGastosMarketing: number;
  importeGastosOtros: number;
  importeGastosRai: number;
  importeGastosTransferencias: number;
}
