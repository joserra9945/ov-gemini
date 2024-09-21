import { useCallback, useContext, useEffect, useState } from 'react';

import usePras from '@shared/hooks/usePras';
import notifications from '@shared/utils/notifications';

import { Spinner } from '@shared/components/Legacy/Spinner';

import PrasContext from '../../Content/PrasContext';

const Productos = (): JSX.Element => {
  const { empresa } = useContext(PrasContext);
  const { prasImporteProductosByCifGet } = usePras();
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProductos = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await prasImporteProductosByCifGet(id);
        if (res) {
          setHtml(res?.importe_productos);
        }
        setLoading(false);
      } catch (e) {
        notifications.unknownError(e);
        setLoading(false);
      }
    },
    [prasImporteProductosByCifGet]
  );

  useEffect(() => {
    empresa?.cif && fetchProductos(empresa?.cif);
  }, [empresa?.cif, fetchProductos]);

  return loading ? (
    <Spinner loading color="#0F1C40" />
  ) : (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default Productos;
