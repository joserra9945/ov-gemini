import {
  ITomaDeRazonByEfectoEstudioIdGet,
  ITomaDeRazonByEfectoEstudioIdGetG,
  ITomaDeRazonByIdGet,
} from '../api/ITomaDeRazon';

export interface ITomaDeRazonEstudioDetails {
  tomasDeRazon: ITomaDeRazonByEfectoEstudioIdGetG;
  fetchTomaDeRazon: (arg1: boolean, arg2?: string) => Promise<void>;
  setCurrentTomaDeRazon: React.Dispatch<
    React.SetStateAction<ITomaDeRazonByIdGet | ITomaDeRazonByEfectoEstudioIdGet>
  >;
}
