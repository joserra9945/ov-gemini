interface IDocumentoDePagoByPagoIdGet {
  id: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
}

interface IDocumenDePagoDeudaByIdGet {
  id: string;
  tipoDocumento: {
    id: string;
    nomnbre: string;
  };
}

type IDocumentoDePagoByPagoIdGetP = Promise<IDocumentoDePagoByPagoIdGet>;

type IDocumenDePagoDeudaByIdGetP = Promise<IDocumenDePagoDeudaByIdGet>;

export type {
  IDocumenDePagoDeudaByIdGet,
  IDocumenDePagoDeudaByIdGetP,
  IDocumentoDePagoByPagoIdGet,
  IDocumentoDePagoByPagoIdGetP,
};
