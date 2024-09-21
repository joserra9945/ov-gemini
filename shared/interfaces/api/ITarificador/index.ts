import { ITarificadorPreciosOperacionByImportesPostResponse } from './ITarificadorPreciosOperacionByImportesPostResponse';

export interface ITarificadorConstantsGet {
  minDiasFinanciacionDescPagares: number;
  minDiasFinanciacionFactoring: number;
  minImporteComision: number;
  minImporteInteres: number;
}

type ITarificadorPreciosOperacionByImportesPutResponseP =
  Promise<ITarificadorPreciosOperacionByImportesPutResponseP>;

type ITarificadorConstantsGetP = Promise<ITarificadorConstantsGet>;
type ITarificadorPreciosOperacionByImportesPostResponseP =
  Promise<ITarificadorPreciosOperacionByImportesPostResponse>;

export type {
  ITarificadorConstantsGetP,
  ITarificadorPreciosOperacionByImportesPostResponseP,
  ITarificadorPreciosOperacionByImportesPutResponseP,
};
