import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';
import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

type IFirmaNotarialByFIltersGet = {
  id: string;
  empresaInterna: {
    id: string;
    codigo: IEnum;
  };
  estado: IEnum;
  fechaPrevista: string;
  librador: ILibradoLibrador;
  notario: Notario;
  tipo: IEnum;
};

export interface Notario {
  id: string;
  nombreCompleto: string;
}

type IFirmaNotarialByFIltersGetG = IGenericResponse<IFirmaNotarialByFIltersGet>;
type IFirmaNotarialByFIltersGetGP = Promise<IFirmaNotarialByFIltersGetG>;

export type {
  IFirmaNotarialByFIltersGet,
  IFirmaNotarialByFIltersGetG,
  IFirmaNotarialByFIltersGetGP,
};
