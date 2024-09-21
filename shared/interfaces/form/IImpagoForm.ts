import { IEnum } from '../IEnum';

export interface IImpagoForm {
  id?: string;
  estado: IEnum;
  fecha: string;
  motivo: string;
  motivoImpagoDefault: string;
}
