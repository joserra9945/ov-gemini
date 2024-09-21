import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEfectoOperacion {
  estado: IEnum;
  fechaValor: Date;
  id: string;
  numero: string;
}

interface IEfectoByGestionFiltersGet {
  id: string;
  creationTime: string;
  cobroManual: {
    fecha: string;
    formaDeCobro: IEnum;
    importeCobrado: number;
    usuarioInternoId: string;
  };
  delegacion: IEnum;
  confirmado: boolean;
  estadoFinanciacion: IEnum;
  fechaEmision: string;
  fechaUltimoCobro: string;
  fechaVencimiento: string;
  impago: {
    id: string;
    descripcion: string;
    estado: IEnum;
    fecha: string;
    gestor: {
      id: string;
      nombre: string;
    };
    usuarioInternoId: string;
  };
  operacion: IEfectoOperacion;
  importeNominal: number;
  importePendienteCobro: number;
  importeRetencion: number;
  importeRetencionPagado: number;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  libradorCif: string;
  libradorGestorNombre: string;
  libradorId: string;
  libradorRazonSocial: string;
  numero: string;
  retencion: {
    fechaPago: string;
    importePagado: number;
    usuarioInternoId: string;
  };
  scoring: string;
  tieneDetalles: boolean;
  tieneDevolucion: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  ventaAFondo: {
    id: string;
    estado: number;
    numero: number;
  };
}

type IEfectoByGestionFiltersGetG = IGenericResponse<IEfectoByGestionFiltersGet>;
type IEfectoByGestionFiltersGetGP = Promise<IEfectoByGestionFiltersGetG>;

export type {
  IEfectoByGestionFiltersGet,
  IEfectoByGestionFiltersGetG,
  IEfectoByGestionFiltersGetGP,
  IEfectoOperacion,
};
