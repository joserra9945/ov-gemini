interface IFirmaNotarialPost {
  email: string;
  fechaPrevista: Date;
  libradorId: string;
  notarioId: string;
  representanteExternoIds: string[];
  telefono: string;
  empresaInternaId: string;
}
interface IFirmaNotarialPostInterno extends IFirmaNotarialPost {
  representanteInternoId: string;
  tipo: number;
}

export type { IFirmaNotarialPost, IFirmaNotarialPostInterno };
