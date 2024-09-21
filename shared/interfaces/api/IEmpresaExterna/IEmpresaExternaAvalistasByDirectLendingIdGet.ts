import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEmpresaExternaAvalistasByDirectLendingIdGet {
  id: string;
  cif: string;
  razonSocial: string;
}

type IEmpresaExternaAvalistasByDirectLendingIdGetG =
  IGenericResponse<IEmpresaExternaAvalistasByDirectLendingIdGet>;
type IEmpresaExternaAvalistasByDirectLendingIdGetGP =
  Promise<IEmpresaExternaAvalistasByDirectLendingIdGetG>;

export type {
  IEmpresaExternaAvalistasByDirectLendingIdGet,
  IEmpresaExternaAvalistasByDirectLendingIdGetG,
  IEmpresaExternaAvalistasByDirectLendingIdGetGP,
};
