import { useCallback, useContext } from 'react';

import TurboTable from '@shared/components/TurboTable';
import { initialQueryState } from '@shared/components/TurboTable/filters/utils/helpers';
import { useGarantia } from '@shared/hooks';

import DirectLendingContext from '../../context/DirectLendingContext';

import { columns } from './columns';

const Garantias = () => {
  const { garantiaByDirectLendingId } = useGarantia();

  const { directLendingResumen } = useContext(DirectLendingContext);

  const { id } = directLendingResumen;

  const fetchData = useCallback(
    async (params: any) => {
      if (id) {
        return garantiaByDirectLendingId(id, params);
      }
      return { items: [], totalCount: 0 };
    },
    [garantiaByDirectLendingId, id]
  );

  return id ? (
    <div className="h-full w-full">
      <TurboTable
        customHeader="Cesiones"
        columns={columns}
        serviceCall={fetchData}
        scrollHeight="500px"
        defaultQueryState={{
          ...initialQueryState,
          maxResult: 100,
          params: {},
        }}
      />
    </div>
  ) : null;
};

export default Garantias;
