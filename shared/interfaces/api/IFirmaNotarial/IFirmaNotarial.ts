import { IEnum } from '@shared/interfaces/IEnum';

import { ILibradoLibrador } from '../IPrecio';

interface IFirmaNotarialIdGet {
  id: string;
  email: string;
  empresaInternaId: string;
  estado: IEnum;
  fechaPrevista: string;
  librador: ILibradoLibrador;
  notario: Notario;
  notarioLocal: Notario;
  representanteExternoIds: string[];
  representanteInternoId: string;
  telefono: string;
  tipo: IEnum;
}
type Notario = {
  id: string;
  nombreCompleto: string;
};
type IFirmaNotarialIdGetP = Promise<IFirmaNotarialIdGet>;

export type { IFirmaNotarialIdGet, IFirmaNotarialIdGetP };
