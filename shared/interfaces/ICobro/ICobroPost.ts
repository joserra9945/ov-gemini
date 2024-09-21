interface ICobroPost {
  cobros: Cobro[];
  ingresoId: string;
}

export interface Cobro {
  concepto: number;
  descripcion: string;
  efectoId: string;
  importe: number;
}

export type { ICobroPost };
