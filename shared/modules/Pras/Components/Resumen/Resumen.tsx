import { useCallback, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line import/no-cycle
import usePras from '@shared/hooks/usePras';
import notifications from '@shared/utils/notifications';

import { Spinner } from '@shared/components/Legacy/Spinner';

import PrasContext from '../../Content/PrasContext';

const Resumen = (): JSX.Element => {
  const { empresa } = useContext(PrasContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resumen, setResumen] = useState<string>('');
  const { prasDetalleMotivoCifGet } = usePras();

  const fetchPras = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await prasDetalleMotivoCifGet(empresa?.cif);
      if (res) {
        setResumen(res?.detalle_motivo);
      }
      setIsLoading(false);
    } catch (e) {
      notifications.unknownError(e);
      setIsLoading(false);
    }
  }, [empresa?.cif, prasDetalleMotivoCifGet]);

  useEffect(() => {
    empresa?.cif && fetchPras();
  }, [empresa?.cif, fetchPras]);

  if (isLoading) {
    return <Spinner loading={isLoading} color="#0F1C40" />;
  }

  return (
    <div className="resumen">
      <div
        style={{ padding: '10px', textAlign: 'left' }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: resumen || '' }}
      />
    </div>
  );
};

export default Resumen;
