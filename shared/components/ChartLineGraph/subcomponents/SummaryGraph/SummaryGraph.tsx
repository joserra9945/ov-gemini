import { useContext } from 'react';

import { ISummaryGraph } from '@shared/interfaces/components/ISummaryGraph';
import { formatCurrency, formatDateUTC } from '@shared/utils/formatters';

import ChartLineGraphContext from '../../context';
import { tabIndexEnum } from '../../helpers';

import './summaryGraph.scss';

export const SummaryGraph = ({
  summary,
  summaryRAI,
  razonSocial,
  cif,
  informeRAI,
}: ISummaryGraph) => {
  const { selectedTab } = useContext(ChartLineGraphContext);
  const isASNEF = selectedTab === tabIndexEnum.ASNEF;
  const isRAI = selectedTab === tabIndexEnum.RAI;
  const onlyOneAnnotationRAI = isRAI && informeRAI?.items?.length === 1;
  return (
    <div
      className={`${
        onlyOneAnnotationRAI ? 'flex flex-col items-center justify-center' : ''
      } w-1/2 p-2 border-r`}
    >
      <div
        className={`${
          onlyOneAnnotationRAI
            ? 'flex flex-col items-center justify-center'
            : ''
        } mb-4`}
      >
        <p className="text-2xl font-medium">
          {isASNEF ? summary?.razonSocial : razonSocial}
        </p>
        <p className="font-medium text-neutral-75">
          {isASNEF ? summary?.cif : cif}
        </p>
      </div>
      <div
        className={`${
          onlyOneAnnotationRAI ? 'w-80' : ''
        } flex flex-col gap-6 p-3 rounded-lg summary-graph lg:p-6 xl:p-8`}
      >
        <div className="flex flex-col justify-between gap-6">
          <div
            className={`${
              onlyOneAnnotationRAI
                ? 'flex flex-col items-center justify-center my-3'
                : 'flex flex-row my-3 xl:flex-row xl:gap-2'
            }`}
          >
            <p className="mr-1 font-medium text-neutral-75">
              Última actualización:
            </p>
            <p>
              {formatDateUTC(
                isASNEF
                  ? summary?.fechaUltimaActualizacion
                  : summaryRAI?.fechaRespuesta
              )}
            </p>
          </div>
          <div
            className={`${
              onlyOneAnnotationRAI ? 'items-center justify-center' : ''
            } flex flex-col gap-1 mb-2`}
          >
            <p className="font-medium text-neutral-75">Deuda actual</p>
            <p
              className={`text-2xl font-medium ${
                summary?.importeTotalImpagado === 0 ||
                summaryRAI?.importeTotalImpagado === 0
                  ? 'text-secondary'
                  : 'text-danger'
              }`}
            >
              {formatCurrency(
                isASNEF
                  ? summary?.importeTotalImpagado
                  : summaryRAI?.importeTotalImpagado
              )}
            </p>
          </div>
          <div
            className={`${
              onlyOneAnnotationRAI ? 'items-center justify-center' : ''
            } flex flex-col gap-1 mb-4`}
          >
            <p className="font-medium text-neutral-75">
              {isASNEF ? 'Fecha de alta' : 'Fecha de última anotación'}
            </p>
            <p className="text-2xl font-medium">
              {formatDateUTC(
                isASNEF
                  ? summary?.fechaAlta
                  : summaryRAI?.fechaApunteMasReciente
              )}
            </p>
          </div>
        </div>
        <div
          className={`${
            onlyOneAnnotationRAI
              ? 'flex-col items-center justify-center'
              : 'flex-row justify-between sm:flex-row xl:flex-row'
          } flex gap-2 mb-4 `}
        >
          {isASNEF ? (
            <>
              <div className="flex flex-col gap-1 ">
                <p className="font-medium text-neutral-75">Operaciones</p>
                <p className="text-2xl font-medium">
                  {summary?.numeroOperaciones}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex font-medium text-neutral-75 whitespace-nowrap">
                  Op. impagadas
                </p>
                <p className="text-2xl font-medium text-danger">
                  {summary?.numeroOperacionesImpagadas}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="font-medium text-neutral-75">Nº de anotaciones</p>
              <p
                className={`${
                  onlyOneAnnotationRAI
                    ? 'flex flex-col items-center justify-center'
                    : ''
                } text-2xl font-medium`}
              >
                {summaryRAI?.numeroApuntes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
