import React, { useCallback, useEffect, useState } from 'react';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';

import { useFirmaNotarial } from '@shared/hooks';
import { IFirmaNotarialProximaGet } from '@shared/interfaces/api/IFirmaNotarial';
import { formatFullDateUTC } from '@shared/utils/formatters';

import Alert from 'components/Alert';
import { alertType } from 'components/Alert/utils';

type AlertFirmaProps = {
  libradorId: string;
};

const AlertFirma: React.FC<AlertFirmaProps> = ({ libradorId }) => {
  const [proximaFirma, setProximaFirma] =
    useState<IFirmaNotarialProximaGet | null>(null);

  const { firmaNotarialProximaGet } = useFirmaNotarial();

  const fetchProximaFirma = useCallback(async () => {
    const res = await firmaNotarialProximaGet(libradorId);
    setProximaFirma(res?.id ? res : null);
  }, [firmaNotarialProximaGet, libradorId]);

  useEffect(() => {
    fetchProximaFirma();
  }, [fetchProximaFirma]);

  return !proximaFirma ? null : (
    <div className="border p-4">
      <Alert
        onIcon={faCircleCheck}
        type={alertType.SIMPLE}
        canHide
        message={
          <div>
            Tiene una{' '}
            <span className="font-bold">
              cita de firma ante notario pendiente:
            </span>{' '}
            {formatFullDateUTC(proximaFirma.fechaPrevista)} - Notaría:{' '}
            {proximaFirma.notarioNombreCompleto}
          </div>
        }
        onClose={() => setProximaFirma(null)}
      />
    </div>
  );
};

export default AlertFirma;
