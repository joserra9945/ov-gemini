import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IEmpresaInternaGet {
  id: string;
  cif: string;
  razonSocial: string;
  tipoSociedad: IEnum;
  codigo: IEnum;
}

type IEmpresaInternaGetG = IGenericResponse<IEmpresaInternaGet>;

type IEmpresaInternaGetGP = Promise<IEmpresaInternaGetG>;

export type { IEmpresaInternaGet, IEmpresaInternaGetG, IEmpresaInternaGetGP };
