interface IFirmaNotarialPut {
  id: string;
  email: string;
  fechaPrevista: Date;
  notarioId: string;
  notarioLocalId: string;
  representanteExternoIds: string[];
  representanteInternoId: string;
  telefono: string;
  tipo: number;
}

export type { IFirmaNotarialPut };
