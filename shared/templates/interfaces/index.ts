import { Dispatch, SetStateAction } from 'react';

import {
  IEmpresaExternaIdRiesgoLibradoresGet,
  IEmpresaExternaIdRiesgoLibradosGet,
} from '@shared/interfaces/api/IEmpresaExterna';
import { IEmpresaRiesgoVivo } from '@shared/interfaces/IEmpresas';

export interface IRazonSocialTemplate {
  empresaId?: string;
  razonSocial?: string;
}

export interface IStringTemplate {
  text?: string;
  className?: string;
  wrapperClassname?: string;
}

export interface IGestorOperacionTemplate {
  gestor: string;
  className?: string;
  numeroOperacion: number;
}

export interface IImporteFormateadoTemplate {
  importe?: number;
  porcentage?: boolean;
  className?: string;
  comesFromCuentaCliente?: boolean;
}

export interface IFechaTemplate {
  fecha: string;
}

export interface IFechaHoraTemplate {
  fechaHora: string;
}

export interface IEmpresaTemplate {
  empresaRazonSocial: string;
}

export interface IOnRowFunctionalComponent {
  rowData: any;
}

export interface IImporteNegativeValueTemplate {
  importe: number;
  className?: string;
}

export interface IPropuestaModificadaTemplate {
  importeInicial: number;
  importeNominal: number;
}

export interface IStringToJSONListTemplate {
  stringJSON: string;
}

export interface IGenericJson {
  [key: string]: string;
}

type IRowDataCartera =
  | IEmpresaRiesgoVivo
  | IEmpresaExternaIdRiesgoLibradoresGet
  | IEmpresaExternaIdRiesgoLibradosGet;
export interface IRiesgoCarteraTemplate {
  rowData: IRowDataCartera;
  className?: string;
  importe: number;
  setRiesgoSelected: Dispatch<SetStateAction<IRowDataCartera>>;
  tipoRiesgo: number;
  setTipoRiesgoSelected: Dispatch<SetStateAction<number>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export type { IRowDataCartera };
