import { createContext, Dispatch, SetStateAction } from 'react';

import { IDireccionesEmpresa } from '@shared/interfaces/Legacy/IDireccionesEmpresa';

import { IEmpresa, IKycForm, ISocios } from '../interfaces';

interface IPerfilEmpresaContext {
  empresa: IEmpresa;
  setEmpresa: Dispatch<SetStateAction<IEmpresa>>;
  hasData: boolean[] | { [key: string]: boolean };
  setHasData: Dispatch<SetStateAction<boolean[] | { [key: string]: boolean }>>;
  socios: ISocios[];
  setSocios: Dispatch<SetStateAction<ISocios[]>>;
  kyc: IKycForm;
  setKyc: Dispatch<SetStateAction<IKycForm>>;
  direcciones: IDireccionesEmpresa[];
  setDirecciones: Dispatch<SetStateAction<IDireccionesEmpresa[]>>;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

const PerfilEmpresaContext = createContext<IPerfilEmpresaContext>(
  {} as IPerfilEmpresaContext
);

export default PerfilEmpresaContext;
