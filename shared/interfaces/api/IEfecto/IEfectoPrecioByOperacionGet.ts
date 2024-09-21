import { IEnum } from '@shared/interfaces/IEnum';
import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

import { IPorcentajes } from '../IPrecio';

export interface IEfectoPrecioByOperacionGet {
  fechaEmision: Date | string;
  fechaVencimiento: Date | string;
  id: string;
  importeNominal: number;
  importesSolicitables: boolean;
  librado: ILibradoLibrador;
  numero: string;
  importesSolicitados: IPorcentajes;
  importesValidos: IPorcentajes;
  scoring: IEnum;
}
