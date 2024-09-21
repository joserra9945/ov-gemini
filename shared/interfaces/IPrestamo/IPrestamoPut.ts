export interface IPrestamoPut {
  id: string;
  avalistaIds?: string[];
  importeNominal?: number;
  plazoEnMeses?: number;
  tipoAval: number;
}
