import { useCallback, useContext, useEffect, useState } from 'react';
import { has } from 'lodash';
import { nanoid } from 'nanoid';

import usePras from '@shared/hooks/usePras';
import { IPrasCargos, ITipoCargo } from '@shared/interfaces/api/IPras';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Spinner } from '@shared/components/Legacy/Spinner';

import PrasContext from '../../Content/PrasContext';
import { PrasTabProps } from '../../interfaces';

import CargosInfo from './CargosInfo';

import '@shared/styles/app-theme/modules/pras.scss';

const Cargos = ({
  defaultAccordion = 'Consejo',
  empresa,
  inactivos = false,
  mostrarBotonCargos = false,
  NoDataComponent,
}: PrasTabProps): JSX.Element => {
  const [hasCargo, setHasCargo] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAllCargos, setShowAllCargos] = useState(mostrarBotonCargos);
  const [tipoCargos, setTipoCargos] = useState<IPrasCargos>();
  const { prasCargosOCargosCesesByIdGet } = usePras();
  const prasContext = useContext(PrasContext);

  const fetchCargos = useCallback(
    async (id: string, inactivosValue?: boolean) => {
      try {
        setLoading(true);

        const res = await prasCargosOCargosCesesByIdGet(id, inactivosValue);
        if (res) {
          setTipoCargos(res.cargos);
        }

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    },
    [prasCargosOCargosCesesByIdGet]
  );

  useEffect(() => {
    fetchCargos(empresa?.cif ?? prasContext.empresa.cif, inactivos);
  }, [empresa?.cif, fetchCargos, inactivos, prasContext.empresa]);

  useEffect(() => {
    if (has(tipoCargos, defaultAccordion)) {
      setHasCargo(true);
    }
  }, [defaultAccordion, tipoCargos]);

  return loading ? (
    <Spinner loading color="#0F1C40" />
  ) : (
    <div className="h-full px-4 pt-4">
      {mostrarBotonCargos &&
        tipoCargos &&
        hasCargo &&
        (Array.isArray(Object.keys(tipoCargos)) &&
        Object.keys(tipoCargos)?.length ? (
          <div className="flex justify-between items-centerpy-4">
            <h4 className="text-xl text-primary font-semibold">
              Listado de cargos
            </h4>
            <span
              role="button"
              tabIndex={0}
              onClick={() => setShowAllCargos(!showAllCargos)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setShowAllCargos(!showAllCargos);
                }
              }}
            >
              {showAllCargos ? 'Ver todos los cargos' : 'Ver menos'}
            </span>
          </div>
        ) : (
          NoDataComponent
        ))}
      <Accordion>
        {tipoCargos &&
          Array.isArray(Object.keys(tipoCargos)) &&
          Object.keys(tipoCargos)?.map((tipo, index) => {
            return hasCargo && !showAllCargos ? (
              tipo === defaultAccordion && (
                <AccordionTab
                  id={index}
                  title={tipo}
                  key={nanoid()}
                  defaultExpanded
                >
                  {(tipoCargos as Record<string, ITipoCargo[]>)[tipo]?.map(
                    (item) => (
                      <CargosInfo item={item} key={nanoid()} />
                    )
                  )}
                </AccordionTab>
              )
            ) : (
              <AccordionTab id={index} title={tipo} key={nanoid()}>
                {(tipoCargos as Record<string, ITipoCargo[]>)[tipo]?.map(
                  (item) => (
                    <CargosInfo item={item} key={nanoid()} />
                  )
                )}
              </AccordionTab>
            );
          })}
      </Accordion>
    </div>
  );
};

export default Cargos;
