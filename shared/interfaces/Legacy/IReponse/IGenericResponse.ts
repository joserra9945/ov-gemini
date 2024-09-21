import { Type } from 'typescript';

export interface IGenericResponse<I = Type> {
  currentPage?: number;
  items: Array<I>;
  totalCount: number;
  totales?: { [key: string]: string };
}

export interface IGenericTableItemResponse {
  creationTime?: string;
  importe?: number;
  estado?: number;
  estadoNombre?: string;
}
