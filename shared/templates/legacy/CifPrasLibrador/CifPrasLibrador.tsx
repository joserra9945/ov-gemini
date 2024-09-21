import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { useFetch } from '@shared/utils';
import { esProduccion } from '@shared/utils/utils';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IPras } from '@shared/interfaces/Legacy/IPras';

import './cifPrasLibrador.scss';

const prasConfig: AxiosRequestConfig = {
  baseURL: esProduccion ? 'https://api.pras.es' : 'https://api.prepras.app',
  responseType: 'json',
};

const CifPrasLibrador = ({ rowData }: any): JSX.Element => {
  const [pras, setPras] = useState<IPras | null>(null);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const { get: getPras } = useFetch('', prasConfig);

  const fecthPRAS = useCallback(async () => {
    const res = await getPras<{ data: IPras }>(
      `/scoring/?cif=${rowData?.librador.cif}`
    );
    if (res?.data) {
      setPras(res.data);
    }
  }, [getPras, rowData?.librador.cif]);

  useEffect(() => {
    if (fetchData) {
      fecthPRAS();
    }
  }, [fecthPRAS, fetchData]);

  return (
    <Tooltip content={pras?.scoring ?? '-'} classNameTrigger="ellipsis">
      <div
        className="librador-scoring"
        onMouseEnter={() => setFetchData(true)}
        onMouseLeave={() => setFetchData(false)}
      >
        {rowData?.librador.cif || '-'}
      </div>
    </Tooltip>
  );
};

export default CifPrasLibrador;
