import { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';

import TurboTable from '@shared/components/TurboTable';
import {
  IMappedQueryState,
  IQueryState,
} from '@shared/components/TurboTable/interfaces/TurboTableType';
import { useDirectLending } from '@shared/hooks';
import {
  IDirectLendingByFiltersGet,
  IDirectLendingByFiltersGetGP,
} from '@shared/interfaces/api/IDirectLending';

import { tableColumns } from '../constants/tableColumns';

type TableProps = {
  initialQueryState: IQueryState;
  notifyNoData: Dispatch<SetStateAction<boolean>>;
  header: ReactNode;
  setShowResumen: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<IDirectLendingByFiltersGet>>;
};
const Table = ({
  initialQueryState,
  notifyNoData,
  header,
  setShowResumen,
  setSelected,
}: TableProps) => {
  const { directLendingByFiltersIdGet } = useDirectLending();

  const checkIfResponseHasData = useCallback(
    async (promiseResponse: IDirectLendingByFiltersGetGP) => {
      const response = await promiseResponse;
      const hasData = response.items && response.items.length > 0;
      notifyNoData(!hasData);
    },
    [notifyNoData]
  );

  const fecthPrestamos = useCallback(
    async (params: IMappedQueryState) => {
      const promiseResponse = directLendingByFiltersIdGet(params);
      checkIfResponseHasData(promiseResponse);
      return promiseResponse;
    },
    [directLendingByFiltersIdGet, checkIfResponseHasData]
  );

  return (
    <TurboTable<IDirectLendingByFiltersGet>
      customHeader={header}
      columns={tableColumns(setShowResumen, setSelected)}
      serviceCall={fecthPrestamos}
      defaultQueryState={initialQueryState}
    />
  );
};

export default Table;
