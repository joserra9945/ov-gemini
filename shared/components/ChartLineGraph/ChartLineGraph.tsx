import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';

import {
  useAuthentication,
  useInforme,
  useSolicitudDeCompra,
} from '@shared/hooks';
import { useRole } from '@shared/hooks/useRole';
import { IAuthUserGet } from '@shared/interfaces/api/IAuth';
import {
  IInformeDetalleOpGetByCifG,
  IInformeGetByCif,
  IInformeGetResumenByCifG,
  IInformeRAIGetByCifG,
} from '@shared/interfaces/api/IInforme';
import { ISolicitudDeCompraByCif } from '@shared/interfaces/api/ISolicitudDeCompra';
import { IChartLineGraph } from '@shared/interfaces/components/IChartLineGraph';
import { initialQueryState } from '@shared/utils/constants';
import { formatDateUTC } from '@shared/utils/formatters';
import { IQueryReducer } from '@shared/utils/queryReducer';

import { Button } from '@shared/components/Legacy/Button';
import { Tab, Tabs } from '@shared/components/Legacy/Tabs';
import { TurboTable } from '@shared/components/Legacy/TurboTable';

import { Spinner } from '../Legacy/Spinner';

import { FooterGraph } from './subcomponents/FooterGraph/FooterGraph';
import { RenderGraphLine } from './subcomponents/RenderGraphLine';
import { SummaryGraph } from './subcomponents/SummaryGraph';
import columns from './columns';
import ChartLineGraphContext from './context';
import { tabIndexEnum, tabMenuItems } from './helpers';

import './chartLineGraph.scss';

export const ChartLineGraph = ({
  cif,
  showSummary,
  razonSocial,
  className,
}: IChartLineGraph) => {
  const [summary, setSummary] = useState<IInformeGetByCif>(
    {} as IInformeGetByCif
  );
  const [summaryRAI, setSummaryRAI] = useState<IInformeGetByCif>(
    {} as IInformeGetByCif
  );
  const [informe, setInforme] = useState<IInformeGetResumenByCifG>(
    {} as IInformeGetResumenByCifG
  );
  const [informeRAI, setInformeRAI] = useState<IInformeRAIGetByCifG>(
    {} as IInformeRAIGetByCifG
  );
  const [userName, setUserName] = useState<IAuthUserGet>({} as IAuthUserGet);
  const [userNameRAI, setUserNameRAI] = useState<IAuthUserGet>(
    {} as IAuthUserGet
  );
  const [ultimaCompra, setUltimaCompra] = useState<ISolicitudDeCompraByCif>(
    {} as ISolicitudDeCompraByCif
  );
  const [ultimaCompraRAI, setUltimaCompraRAI] =
    useState<ISolicitudDeCompraByCif>({} as ISolicitudDeCompraByCif);
  const [queryState, setQueryState] =
    useState<IQueryReducer>(initialQueryState);
  const [detalleOp, setDetalleOp] = useState<IInformeDetalleOpGetByCifG>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { esRiesgos } = useRole();
  const [selectedTab, setSelectedTab] = useState(tabIndexEnum.RAI);
  const isASNEF = selectedTab === tabIndexEnum.ASNEF;
  const isRAI = selectedTab === tabIndexEnum.RAI;
  const noContentASNEF =
    isASNEF && !informe.items?.length && !summary.id && ultimaCompra.id;
  const noContentRAI =
    isRAI &&
    !informeRAI.items?.length &&
    !summaryRAI?.id &&
    ultimaCompraRAI?.id;
  const {
    solicitudCompraPost,
    solicitudUltimaByCifGet,
    solicitudCompraRAIPost,
    solicitudUltimaByCifRAIGet,
  } = useSolicitudDeCompra();
  const {
    informeByCifGet,
    informeResumenByCifGet,
    informeDetalleOpByCifGet,
    informeUltimoRAIGet,
    informeRAIGet,
  } = useInforme();
  const { authUserGet } = useAuthentication();

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);

    const res = await informeByCifGet(cif);
    res && setSummary(res);
    setIsLoading(false);
  }, [cif, informeByCifGet]);

  const fetchInforme = useCallback(async () => {
    setIsLoading(true);

    const res = await informeResumenByCifGet(cif);
    res && setInforme(res);

    setIsLoading(false);
  }, [cif, informeResumenByCifGet]);

  const fetchAuth = useCallback(async () => {
    const res = await authUserGet(ultimaCompra?.userIdentityId);
    res && setUserName(res);
  }, [authUserGet, ultimaCompra?.userIdentityId]);

  const fetchAuthRAI = useCallback(async () => {
    const res = await authUserGet(ultimaCompraRAI?.userIdentityId);
    res && setUserNameRAI(res);
  }, [authUserGet, ultimaCompraRAI?.userIdentityId]);

  const fetchUltimaSolicitud = useCallback(async () => {
    const res = await solicitudUltimaByCifGet(cif);
    res && setUltimaCompra(res);
  }, [cif, solicitudUltimaByCifGet]);

  const fetchUltimaSolicitudRAI = useCallback(async () => {
    const res = await solicitudUltimaByCifRAIGet(cif);
    res && setUltimaCompraRAI(res);
  }, [cif, solicitudUltimaByCifRAIGet]);

  const fetchDetalleOp = useCallback(async () => {
    if (!isEmpty(queryState)) {
      const res = await informeDetalleOpByCifGet(cif, queryState);
      res && setDetalleOp(res);
    }
  }, [cif, informeDetalleOpByCifGet, queryState]);

  const fetchInformeUltimoRAI = useCallback(async () => {
    setIsLoading(true);

    const res = await informeUltimoRAIGet(cif);
    res && setSummaryRAI(res);

    setIsLoading(false);
  }, [cif, informeUltimoRAIGet]);

  const fetchInformeRAI = useCallback(async () => {
    setIsLoading(true);

    const res = await informeRAIGet(cif);
    res && setInformeRAI(res);
    setIsLoading(false);
  }, [cif, informeRAIGet]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (isASNEF) {
      await solicitudCompraPost(cif);
      await fetchInforme();
      await fetchUltimaSolicitud();
      await fetchDetalleOp();
      showSummary && (await fetchSummary());
    } else if (isRAI) {
      await solicitudCompraRAIPost(cif);
      await fetchInformeRAI();
      await fetchUltimaSolicitudRAI();
      showSummary && (await fetchInformeUltimoRAI());
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isASNEF) {
      fetchInforme();
      fetchUltimaSolicitud();
      fetchDetalleOp();
    } else if (isRAI) {
      fetchInformeRAI();
      fetchUltimaSolicitudRAI();
    }
  }, [
    fetchDetalleOp,
    fetchInforme,
    fetchInformeRAI,
    fetchUltimaSolicitud,
    fetchUltimaSolicitudRAI,
    isASNEF,
    isRAI,
  ]);

  useEffect(() => {
    if (showSummary && isASNEF) {
      fetchSummary();
    } else if (showSummary && isRAI) {
      fetchInformeUltimoRAI();
    }
  }, [fetchInformeUltimoRAI, fetchSummary, isASNEF, isRAI, showSummary]);

  useEffect(() => {
    if (ultimaCompra?.userIdentityId && isASNEF) {
      fetchAuth();
    } else if (ultimaCompraRAI?.userIdentityId && isRAI) {
      fetchAuthRAI();
    }
  }, [
    fetchAuth,
    fetchAuthRAI,
    isASNEF,
    isRAI,
    ultimaCompra?.userIdentityId,
    ultimaCompraRAI?.userIdentityId,
  ]);

  const contextValues = useMemo(
    () => ({ selectedTab, setSelectedTab }),
    [selectedTab]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center spinner-asnef">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }

  return (
    <ChartLineGraphContext.Provider value={contextValues}>
      <Tabs
        type="underline"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      >
        {tabMenuItems.map((tab) => {
          return (
            <Tab
              title={tab.label}
              key={tab.id}
              className="h-full tabs-asnef-rai"
            >
              <section
                className={`h-[90%] font-roboto w-full ${className ?? ''}`}
              >
                {(!informe.items?.length && !summary?.id && isASNEF) ||
                (!informeRAI?.items?.length && !summaryRAI?.id && isRAI) ? (
                  <div className="flex flex-col items-center justify-center gap-3 my-5">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <p className="text-base font-medium leading-6 text-gray-700 lg:font-semibold lg:text-lg lg:leading-7">
                        {razonSocial}
                      </p>
                      <p className="text-xs leading-4 text-gray-400 font-xs">
                        {cif}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <p className="h-10 mb-3 text-2xl font-bold text-gray-800">
                        {noContentASNEF || noContentRAI
                          ? 'Consultado pero no tiene datos'
                          : 'No hay datos comprados'}
                        {noContentASNEF || noContentRAI ? (
                          <p className="flex flex-row items-center justify-center text-sm font-medium">
                            Fecha de la consulta:{' '}
                            <span className="ml-1">
                              {formatDateUTC(
                                isASNEF
                                  ? ultimaCompra?.fecha
                                  : ultimaCompraRAI?.fecha
                              )}
                            </span>
                          </p>
                        ) : null}
                      </p>
                      {esRiesgos && !isASNEF && (
                        <Button
                          className="w-40 h-12 text-white rounded-md bg-primary hover:bg-primary-over"
                          label={`Comprar ${isASNEF ? 'ASNEF' : 'RAI'}`}
                          onClick={() => handleSubmit()}
                          disabled={isLoading}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`${
                        isRAI && informeRAI.items?.length === 1
                          ? 'items-center justify-center'
                          : ''
                      } flex flex-row w-full mb-2 `}
                    >
                      {showSummary && (
                        <SummaryGraph
                          summary={summary}
                          summaryRAI={summaryRAI}
                          razonSocial={razonSocial}
                          cif={cif}
                          informeRAI={informeRAI}
                        />
                      )}
                      {(isRAI && informeRAI.items?.length > 1) ||
                      (isASNEF && informe.items?.length > 1) ? (
                        <div className="w-full">
                          <RenderGraphLine
                            asnef={informe}
                            rai={informeRAI}
                            title="Evolución deuda"
                          />
                        </div>
                      ) : null}
                    </div>
                    {!!detalleOp?.items?.length && isASNEF && (
                      <div className="h-20 overflow-y-auto detalle-operaciones-informe">
                        <TurboTable
                          tableTitle="Detalle operaciones"
                          columns={columns}
                          setQueryState={setQueryState}
                          value={detalleOp.items}
                          totalRecords={detalleOp.totalCount}
                          paginator
                          showSelectColumns={false}
                          showFilter={false}
                          emptyMessage="Sin resultados"
                          className="turbotable-detalle-operaciones"
                          scrollHeight="flex"
                          scrollable
                          removableSort
                        />
                      </div>
                    )}
                    <div className="flex flex-row items-center justify-between w-full p-2 mt-3 border-t">
                      <FooterGraph
                        ultimaCompra={ultimaCompra}
                        userName={userName}
                        userNameRAI={userNameRAI}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        ultimaCompraRAI={ultimaCompraRAI}
                      />
                    </div>
                  </>
                )}
              </section>
            </Tab>
          );
        })}
      </Tabs>
    </ChartLineGraphContext.Provider>
  );
};
