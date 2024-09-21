import { IEmpresas } from '@shared/interfaces';

import { IEnum } from '@shared/interfaces/Legacy/IEnum';

export interface IDevolucionDePagares {
  id: string;
  creationTime: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevision: IEnum;
  estadoRevisionDescripcion: string;
  descripcionEstadoRevision: string;
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
  usuarioValidadorId: string;
  usuarioValidadorNombre: string;
  estado: IEnum;
  librador: IEmpresas;
  fetchData?: () => Promise<void>;
}

export interface IDevolucionDePagaresById {
  id: string;
  devolucion: {
    id: string;
    estado: IEnum;
  };
  lastMoidifcationTime: string;
  usuarioUltimaModificacion: {
    id: string;
    nombreCompleto: string;
  };
  fechaEmision: string;
  fechaVencimiento: string;
  importeNominal: number;
  librado: IEmpresas;
  librador: IEmpresas;
  gestor: IEmpresas;
}
