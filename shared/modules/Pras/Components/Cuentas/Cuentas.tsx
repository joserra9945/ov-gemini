import { useCallback, useContext, useEffect, useState } from 'react';

import usePras from '@shared/hooks/usePras';

import { Spinner } from '@shared/components/Legacy/Spinner';

import PrasContext from '../../Content/PrasContext';

const Cuentas = (): JSX.Element => {
  const { empresa } = useContext(PrasContext);
  const { prasCuentaResultadosByIdGet } = usePras();
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCuentas = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await prasCuentaResultadosByIdGet(id);
        if (res) {
          setHtml(res.CuentaResultados);
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    },
    [prasCuentaResultadosByIdGet]
  );

  useEffect(() => {
    empresa?.cif && fetchCuentas(empresa.cif);
  }, [empresa?.cif, fetchCuentas]);

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

export default Cuentas;
