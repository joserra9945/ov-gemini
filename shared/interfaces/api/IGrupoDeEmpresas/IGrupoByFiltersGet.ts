import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IGrupoByFiltersGet {
  id: string;
  activo: boolean;
  empresaCabecera: Cabecera;
  nombre: string;
  numeroEmpresas: number;
}
interface Cabecera {
  cif: string;
  id: string;
  razonSocial: string;
  tipo: IEnum;
}

type IGrupoByFiltersGetG = IGenericResponse<IGrupoByFiltersGet>;
type IGrupoByFiltersGetGP = Promise<IGrupoByFiltersGetG>;

export type { IGrupoByFiltersGet, IGrupoByFiltersGetG, IGrupoByFiltersGetGP };
