import { useCallback, useEffect, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import usePras from '@shared/hooks/usePras';
import notifications from '@shared/utils/notifications';

import Content from './Content';
import Header from './Header';

interface IPrasProps {
  cif: string;
  razonSocial: string;
  userId?: string;
  singlePage?: boolean;
  onScoringChange?: (() => void) | null;
  tabs: number[];
  showHeader?: boolean;
  responsiveTabs?: boolean;
  esProduccion?: boolean;
  setAccordionWidth?: number;
  nombreCompleto?: string;
}

const Pras = ({
  userId,
  cif,
  razonSocial,
  singlePage = false,
  onScoringChange = null,
  tabs,
  showHeader,
  responsiveTabs = true,
  setAccordionWidth,
  nombreCompleto,
}: IPrasProps): JSX.Element => {
  const [scoring, setScoring] = useState<string | null>(null);
  const [accion, setAccion] = useState<string | null>(null);
  const [fecha, setFecha] = useState<string | null>();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { prasScoringByLibradoCifGet } = usePras();
  const { prasAccionByLibradoCifGet } = usePras();

  const fetchScoringAndAccion = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await prasScoringByLibradoCifGet(cif);
      if (res) {
        setScoring(res?.scoring);
        setFecha(res?.fecha || res?.fechaValidacion);
      }
      const resAccion = await prasAccionByLibradoCifGet(cif);
      if (resAccion) {
        setAccion(resAccion?.accion);
      }
      setIsFetching(false);
    } catch (e) {
      notifications.unknownError(e);
      setIsFetching(false);
    }
  }, [cif, prasAccionByLibradoCifGet, prasScoringByLibradoCifGet]);

  useEffect(() => {
    if (cif) {
      fetchScoringAndAccion();
    }
  }, [cif, fetchScoringAndAccion]);

  if (isFetching && !cif) {
    return (
      <div className="text-center">
        <ProgressSpinner />
      </div>
    );
  }
  return (
    <div>
      {showHeader && (
        <Header
          scoring={scoring}
          fecha={fecha}
          accion={accion}
          empresa={{ cif, razonSocial }}
          singlePage={singlePage}
          onScoringChange={onScoringChange}
          userId={userId}
          nombreCompleto={nombreCompleto}
        />
      )}
      <Content
        empresa={{ cif, razonSocial }}
        tabs={tabs}
        responsiveTabs={responsiveTabs}
        setAccordionWidth={setAccordionWidth}
      />
    </div>
  );
};

export default Pras;
