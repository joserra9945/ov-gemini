import { createContext, Dispatch, SetStateAction } from 'react';

import { IDirectLendingByFiltersGet } from '@shared/interfaces/api/IDirectLending';
import { IPrestamoIdGet } from '@shared/interfaces/IPrestamo';

interface IDirectLendingContext {
  directLending?: IDirectLendingByFiltersGet;
  config?: { [key: string]: string | number };
  directLendingResumen: IPrestamoIdGet;
  setShowSolicitarFirmaModal: Dispatch<SetStateAction<boolean>>;
}

const DirectLendingContext = createContext<IDirectLendingContext>(
  {} as IDirectLendingContext
);

export default DirectLendingContext;
