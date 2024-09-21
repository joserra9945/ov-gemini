import { useCallback, useContext, useEffect, useState } from 'react';

import usePras from '@shared/hooks/usePras';
import notifications from '@shared/utils/notifications';

import { Spinner } from '@shared/components/Legacy/Spinner';

import PrasContext from '../../Content/PrasContext';

const Balance = (): JSX.Element => {
  const { empresa } = useContext(PrasContext);
  const { prasBalanceByCifGet } = usePras();
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fetchBalance = useCallback(
    async (cif: string) => {
      try {
        setLoading(true);
        const res = await prasBalanceByCifGet(cif);
        if (res) {
          setHtml(res?.Balance);
        }
        setLoading(false);
      } catch (e) {
        notifications.unknownError(e);
        setLoading(false);
      }
    },
    [prasBalanceByCifGet]
  );

  useEffect(() => {
    empresa.cif && fetchBalance(empresa.cif);
  }, [empresa?.cif, fetchBalance]);

  return loading ? (
    <Spinner loading color="#0F1C40" />
  ) : (
    <div
      className="override-tables"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Balance;
