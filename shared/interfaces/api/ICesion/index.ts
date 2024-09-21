import { IEnum } from '@shared/interfaces/IEnum/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse/IGenericResponse';
import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

import { ICesionBodyPost } from './ICesionBodyPost';
import {
  ICesionByFiltersGet,
  ICesionByFiltersGetG,
  ICesionByFiltersGetGP,
} from './ICesionByFiltersGet';
import {
  ICesionByFiltersInternoGet,
  ICesionByFiltersInternoGetG,
  ICesionByFiltersInternoGetGP,
} from './ICesionByFiltersIntrernoGet';
import {
  ICesionByFirmaNotarialIdGet,
  ICesionByFirmaNotarialIdGetG,
  ICesionByFirmaNotarialIdGetGP,
} from './ICesionByFirmaNotarialIdGet';
import { ICesionPut } from './ICesionPut';
import {
  ICesionVinculablesFirmaNotarialGet,
  ICesionVinculablesFirmaNotarialGetG,
  ICesionVinculablesFirmaNotarialGetGP,
} from './ICesionVinculablesFirmaNotarialGet';

interface ICesionByIdGet {
  id: string;
  descripcion: string;
  documentosDeCesionAmount: number;
  empresaInternaCodigo: string;
  empresaInternaId: string;
  esAutoGenerada: boolean;
  esConClausula24: boolean;
  esSinComunicar: boolean;
  esSinRecurso: boolean;
  estado: IEnum;
  estadoFirma: IEnum;
  fechaFinalizacion: string;
  fechaFirmaAnteNotario: string | Date;
  fechaFirmaDigital: string | Date;
  fechaInicio: string;
  fechaInicioContrato: string;
  fechaUltimoEstado: string | Date;
  firmaNotarialId: string;
  importe: number;
  importePendienteDeEjecutar: number;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
  numero: string;
  porcentajeComision: number;
  porcentajeInteres: number;
  producto: IEnum;
  tipo: IEnum;
  validada: boolean;
}

interface ICesionByEstudioIdGet {
  descripcion: string;
  descripcionEstado: string;
  estado: IEnum;
  estadoFirma: IEnum;
  fechaInicio: string;
  importe: number;
  numero: string;
  tipo: IEnum;
  id: string;
  estadoFinanciacion: IEnum;
}

type ICesionEstadoPut = {
  data: {
    id: string;
    estado: number;
  };
};

type ICesionByIdGetP = Promise<ICesionByIdGet>;

type ICesionByEstudioIdGetG = IGenericResponse<ICesionByEstudioIdGet>;

type ICesionByEstudioIdGetGP = Promise<ICesionByEstudioIdGetG>;

export type {
  ICesionBodyPost,
  ICesionByEstudioIdGet,
  ICesionByEstudioIdGetG,
  ICesionByEstudioIdGetGP,
  ICesionByFiltersGet,
  ICesionByFiltersGetG,
  ICesionByFiltersGetGP,
  ICesionByFiltersInternoGet,
  ICesionByFiltersInternoGetG,
  ICesionByFiltersInternoGetGP,
  ICesionByFirmaNotarialIdGet,
  ICesionByFirmaNotarialIdGetG,
  ICesionByFirmaNotarialIdGetGP,
  ICesionByIdGet,
  ICesionByIdGetP,
  ICesionEstadoPut,
  ICesionPut,
  ICesionVinculablesFirmaNotarialGet,
  ICesionVinculablesFirmaNotarialGetG,
  ICesionVinculablesFirmaNotarialGetGP,
};
