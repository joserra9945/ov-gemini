type IFirmaNotarialProximaGet = {
  id: string;
  fechaPrevista: string;
  notarioNombreCompleto: string;
};

type IFirmaNotarialProximaGetP = Promise<IFirmaNotarialProximaGet>;

export type { IFirmaNotarialProximaGet, IFirmaNotarialProximaGetP };
