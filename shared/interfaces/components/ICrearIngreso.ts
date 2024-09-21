import { IQueryReducer } from '@shared/utils/queryReducer';

export interface ICuentaBancaria {
  nombre: string;
  id: string;
}

export interface ICrearIngresoProps {
  setOpenCrearIngreso: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (qState: IQueryReducer) => Promise<void>;
  queryState: IQueryReducer;
}
