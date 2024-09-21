import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { useFetch } from '@shared/utils';
import { esProduccion } from '@shared/utils/utils';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IPras } from '@shared/interfaces/Legacy/IPras';

import './cifPrasLibrado.scss';

const prasConfig: AxiosRequestConfig = {
  baseURL: esProduccion ? 'https://api.pras.es' : 'https://api.prepras.app',
  responseType: 'json',
};

const CifPrasLibrado = ({ rowData }: any): JSX.Element => {
  const [pras, setPras] = useState<IPras | null>(null);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const { get: getPras } = useFetch('', prasConfig);

  const fecthPRAS = useCallback(async () => {
    const res = await getPras<{ data: IPras }>(
      `/scoring/?cif=${rowData?.librado.cif}`
    );
    if (res?.data) {
      setPras(res?.data);
    }
  }, [getPras, rowData?.librado.cif]);

  useEffect(() => {
    if (fetchData) {
      fecthPRAS();
    }
  }, [fecthPRAS, fetchData]);

  return (
    <Tooltip content={pras?.scoring ?? '-'} classNameTrigger="ellipsis">
      <div
        className="librado-scoring"
        onMouseEnter={() => setFetchData(true)}
        onMouseLeave={() => setFetchData(false)}
      >
        {rowData?.librado.cif || '-'}
      </div>
    </Tooltip>
  );
};

export default CifPrasLibrado;
