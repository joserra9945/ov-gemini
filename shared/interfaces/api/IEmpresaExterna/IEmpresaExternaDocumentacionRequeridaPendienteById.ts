import { IGenericResponse } from '@shared/interfaces';

interface IEmpresaExternaDocumentacionRequeridaPendienteById {
  id: string;
  detalle: string;
  devolucionDePagaresId: string;
  documentoRechazadoId: string;
  empresaExternaId: string;
  fechaRequerimiento: Date;
  motivoRechazo: string;
  pendiente: boolean;
  representanteId: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
}

type IEmpresaExternaDocumentacionRequeridaPendienteByIdG =
  IGenericResponse<IEmpresaExternaDocumentacionRequeridaPendienteById>;
type IEmpresaExternaDocumentacionRequeridaPendienteByIdGP =
  Promise<IEmpresaExternaDocumentacionRequeridaPendienteByIdG>;

export type {
  IEmpresaExternaDocumentacionRequeridaPendienteById,
  IEmpresaExternaDocumentacionRequeridaPendienteByIdG,
  IEmpresaExternaDocumentacionRequeridaPendienteByIdGP,
};
