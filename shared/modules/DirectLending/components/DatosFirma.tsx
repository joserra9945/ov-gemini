import { useCallback, useContext, useEffect, useState } from 'react';

import { useFirmaNotarial } from '@shared/hooks';
import { useRepresentante } from '@shared/hooks/useRepresentante';
import { IFirmaNotarialIdGet } from '@shared/interfaces/api/IFirmaNotarial';
import { IRepresentanteByIdsGet } from '@shared/interfaces/IRepresentante';
import { formatFullDateUTC } from '@shared/utils/formatters';

import DirectLendingContext from '../context/DirectLendingContext';

export const DatosFirma = () => {
  const { directLendingResumen } = useContext(DirectLendingContext);

  const [firmaNotarial, setFirmaNotarial] = useState<IFirmaNotarialIdGet>(
    {} as IFirmaNotarialIdGet
  );

  const [firmantes, setFirmantes] = useState<IRepresentanteByIdsGet[]>();
  const { firmaById } = useFirmaNotarial();
  const { representanteByIdsGet } = useRepresentante();

  const fetchData = useCallback(async () => {
    if (directLendingResumen?.firmaNotarialId) {
      const res = await firmaById(directLendingResumen?.firmaNotarialId);
      res && setFirmaNotarial(res);
    }
  }, [directLendingResumen?.firmaNotarialId, firmaById]);

  const fetchRepresenantes = useCallback(async () => {
    if (firmaNotarial.representanteExternoIds?.length) {
      const res = await representanteByIdsGet(
        firmaNotarial.representanteExternoIds
      );
      res && setFirmantes(res.items);
    }
  }, [firmaNotarial.representanteExternoIds, representanteByIdsGet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (firmaNotarial.representanteExternoIds?.length) {
      fetchRepresenantes();
    }
  }, [fetchRepresenantes, firmaNotarial.representanteExternoIds]);

  return (
    <div className="flex flex-col gap-3">
      <span className="font-roboto text-lg font-bold">Datos de la firma</span>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between font-roboto text-base font-normal">
          Notaría
          <span className="font-medium text-right">{`${
            firmaNotarial?.notario?.nombreCompleto ?? '-'
          }`}</span>
        </div>
        <div className="flex flex-row justify-between font-roboto text-base font-normal">
          Fecha prevista
          {firmaNotarial?.fechaPrevista ? (
            <span className="font-medium">{`${formatFullDateUTC(
              firmaNotarial?.fechaPrevista
            )}`}</span>
          ) : (
            <span className="font-medium">-</span>
          )}
        </div>
        <div className="flex flex-row justify-between font-roboto text-base font-normal">
          Firmantes
          <span className="font-medium">
            {firmantes && firmantes?.length
              ? firmantes.map((firmante) => firmante.nombreCompleto).join(', ')
              : '-'}
          </span>
        </div>
        <div className="flex flex-row justify-between font-roboto text-base font-normal">
          Email{' '}
          <span className="font-medium">{`${
            firmaNotarial?.email ?? '-'
          }`}</span>
        </div>
        <div className="flex flex-row justify-between font-roboto text-base font-normal">
          Teléfono{' '}
          <span className="font-medium">{`${
            firmaNotarial?.telefono ?? '-'
          }`}</span>
        </div>
      </div>
    </div>
  );
};
