import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEmpresaByFiltersGet {
  id: string;
  cif: string;
  esCabecera: boolean;
  grupoId: string;
  idExterno: string;
  razonSocial: string;
  tipoCabecera: IEnum;
}

type IEmpresaByFiltersGetG = IGenericResponse<IEmpresaByFiltersGet>;
type IEmpresaByFiltersGetGP = Promise<IEmpresaByFiltersGetG>;

export type {
  IEmpresaByFiltersGet,
  IEmpresaByFiltersGetG,
  IEmpresaByFiltersGetGP,
};
