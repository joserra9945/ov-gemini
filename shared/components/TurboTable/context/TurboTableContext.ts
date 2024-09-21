import { createContext, useContext } from 'react';
import { DataTableValue } from 'primereact/datatable';

import { ITurboTableContext } from '../interfaces/TurboTableType';

const TurboTableContext = createContext<ITurboTableContext<DataTableValue>>(
  {} as ITurboTableContext<DataTableValue>
);

const useTurboTableContext = <D extends DataTableValue>() =>
  useContext(TurboTableContext) as ITurboTableContext<D>;

export { TurboTableContext, useTurboTableContext };
