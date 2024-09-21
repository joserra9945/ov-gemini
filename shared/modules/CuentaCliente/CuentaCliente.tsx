import { useCallback, useEffect, useMemo, useState } from 'react';

import { useEmpresaExterna } from '@shared/hooks';
import useCuentaCliente from '@shared/hooks/useCuentaCliente';
import useEmpresaInterna from '@shared/hooks/useEmpresaInterna';
import {
  ICuentaClienteGet,
  ICuentaClienteIdMovimientoGetG,
} from '@shared/interfaces/api/ICuentaCliente';
import { IEmpresaExternaCuentaClienteGet } from '@shared/interfaces/api/IEmpresaExterna';
import { IEmpresaInternaGet } from '@shared/interfaces/IEmpresas/IEmpresaInterna';
import { initialQueryState } from '@shared/utils/constants';
import { IQueryReducer } from '@shared/utils/queryReducer';

import { TurboTable } from '@shared/components/Legacy/TurboTable';

import CuentaClienteHeader from './components/CuentaClienteHeader/CuentaClienteHeader';
import columns from './columns';
import { getTableOptions } from './defaultFilters';

interface Props {
  id?: string;
  isAdUser: boolean;
}

const CuentaCliente = ({ id, isAdUser }: Props) => {
  const libradorId = id ?? sessionStorage.getItem('libradorId');

  const [cuentaCliente, setCuentaCliente] = useState<ICuentaClienteGet>(
    {} as ICuentaClienteGet
  );

  const [empresaExternaCuentaCliente, setEmpresaExternaCuentaCliente] =
    useState({} as IEmpresaExternaCuentaClienteGet);
  const [cuentaClienteMovimientos, setCuentaClienteMovimientos] =
    useState<ICuentaClienteIdMovimientoGetG>();
  const [currentCuentaCliente, setCurrentCuentaCliente] = useState<string>();
  const [currentTable, setCurrentTable] = useState<number>(0);
  const [empresasInternas, setEmpresasInternas] =
    useState<IEmpresaInternaGet[]>();
  const [queryState, setQueryState] =
    useState<IQueryReducer>(initialQueryState);
  const {
    cuentaClienteGet,
    cuentaClienteIdMovimientosByFiltersGet,
    loading: loadingCuentaCliente,
  } = useCuentaCliente();
  const { empresaInternaGet, loading: loadingEmpresaInterna } =
    useEmpresaInterna();
  const { empresaExternaCuentaClienteGet, loading: loadingRiesgoVivo } =
    useEmpresaExterna();

  const fetchEmpresasInternas = useCallback(async () => {
    const res = await empresaInternaGet();
    if (res) {
      const empresasArray = Array.isArray(res) ? res : [res];
      setEmpresasInternas(empresasArray);
    }
  }, [empresaInternaGet]);

  const tableOptions = useMemo(() => {
    if (empresasInternas) {
      return getTableOptions(empresasInternas, columns);
    }
  }, [empresasInternas]);

  const empresaInternaSelected = tableOptions?.find(
    (ei) => ei.value === currentTable
  );

  const fetchData = useCallback(async () => {
    if (empresaInternaSelected && libradorId) {
      const resCuentaClienteId = await cuentaClienteGet(
        empresaInternaSelected.id,
        libradorId
      );
      const resCuentaCliente = resCuentaClienteId?.items.find(
        (cuenta) => cuenta.empresaInternaId === empresaInternaSelected.id
      );

      setCuentaCliente(resCuentaCliente || ({} as ICuentaClienteGet));

      if (resCuentaCliente?.id) {
        setCurrentCuentaCliente(empresaInternaSelected.name);
        const res = await cuentaClienteIdMovimientosByFiltersGet(
          resCuentaCliente.id,
          queryState
        );
        res && setCuentaClienteMovimientos(res);
      } else {
        setCuentaClienteMovimientos({} as ICuentaClienteIdMovimientoGetG);
      }
    }
  }, [
    empresaInternaSelected,
    libradorId,
    cuentaClienteGet,
    cuentaClienteIdMovimientosByFiltersGet,
    queryState,
  ]);

  const fetchVistaCuentaCliente = useCallback(async () => {
    if (empresaInternaSelected && libradorId) {
      const res = await empresaExternaCuentaClienteGet(
        empresaInternaSelected.id,
        libradorId
      );
      if (res) {
        setEmpresaExternaCuentaCliente(res);
      }
    }
  }, [empresaInternaSelected, libradorId, empresaExternaCuentaClienteGet]);

  useEffect(() => {
    fetchEmpresasInternas();
  }, [fetchEmpresasInternas]);
  useEffect(() => {
    fetchVistaCuentaCliente();
  }, [fetchVistaCuentaCliente]);

  useEffect(() => {
    fetchData();
  }, [currentTable, fetchData, queryState]);

  return (
    <div className="flex p-4 h-100">
      <TurboTable
        loading={
          loadingCuentaCliente || loadingEmpresaInterna || loadingRiesgoVivo
        }
        className="g-card cuenta-cliente__table ellipsis"
        tableTitle={`Cuenta cliente ${
          currentCuentaCliente ? `- ${currentCuentaCliente}` : ''
        }  `}
        columns={columns}
        value={cuentaClienteMovimientos?.items}
        totalRecords={cuentaClienteMovimientos?.totalCount ?? 0}
        paginator
        showSelectColumns={false}
        showFilter
        emptyMessage="Sin resultados"
        setQueryState={setQueryState}
        scrollHeight="flex"
        removableSort
        scrollable
        initialQueryState={initialQueryState}
        HeaderCustomComponent={
          <CuentaClienteHeader
            cuentaCliente={cuentaCliente || ({} as ICuentaClienteGet)}
            empresaInternaId={empresaInternaSelected?.id}
            fetchData={fetchData}
            fetchVistaCuentaCliente={fetchVistaCuentaCliente}
            isAdUser={isAdUser}
            libradorId={libradorId}
            empresaExternaCuentaCliente={empresaExternaCuentaCliente}
          />
        }
        currentTable={currentTable}
        setCurrentTable={setCurrentTable}
        tableOptions={tableOptions}
        turboFilters
      />
    </div>
  );
};

export default CuentaCliente;
