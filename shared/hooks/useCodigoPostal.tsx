import { useCallback } from 'react';

import { ICodigoPostal } from '@shared/interfaces/ICodigoPostal';

import { codigoPostal } from './endpoints';
import { useFetch } from './useFetch';

const useCodigoPostal = () => {
  const { get: getCodigoPostal } = useFetch(codigoPostal);

  const getCodigoPostalId = useCallback(
    async (nCodigoPostal: string) => {
      const res = await getCodigoPostal<ICodigoPostal>(
        `?Keyword=${nCodigoPostal}`
      );
      return res;
    },
    [getCodigoPostal]
  );

  return {
    getCodigoPostalId,
  };
};

export default useCodigoPostal;
