export interface IPagarePrestamoPost {
  pagares: Pagare[];
  prestamoId: string;
}
export interface Pagare {
  iban: string;
  lugarEmision: string;
  mes: number;
  numero: string;
}
