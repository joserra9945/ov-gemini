import { Type } from 'typescript';

export interface IGenericResponse<I = Type> {
  currentPage?: number;
  items: Array<I>;
  totalCount: number;
  totales?: { [key: string]: string };
}
