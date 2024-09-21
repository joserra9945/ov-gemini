import { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import { useRepresentante } from '@shared/hooks/useRepresentante';
import {
  IFirmantesTable,
  IFirmantesTableRow,
} from '@shared/interfaces/components/IFirmantesTable';
import { IRepresentanteGetByEmpresaId } from '@shared/interfaces/IRepresentante';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';

import { TurboTable } from '@shared/components/Legacy/TurboTable';

import columns from './columns';

export const FirmantesTable = ({
  empresaId,
  onFunction,
  title,
}: IFirmantesTable) => {
  const [selectedRepresentante, setSelectedRepresentante] = useState<
    IRepresentanteGetByEmpresaId[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryState, setQueryState] = useState<IQueryReducer>();
  const [dataFirmantes, setDataFirmantes] =
    useState<IRepresentanteGetByEmpresaId[]>();
  const { representanteByEmpresaIdGet } = useRepresentante();

  const onRowSelectRep = (e: IFirmantesTableRow) => {
    setSelectedRepresentante([...selectedRepresentante, e.data]);
    onFunction([...selectedRepresentante, e.data]);
  };

  const onRowUnselectRep = (e: IFirmantesTableRow) => {
    const tmpSelected = selectedRepresentante.filter((item) => {
      return e?.data?.id !== item?.id;
    });
    setSelectedRepresentante(tmpSelected);
    onFunction(tmpSelected);
  };

  const onAllRowsSelectRep = () => {
    dataFirmantes && setSelectedRepresentante(dataFirmantes);
    onFunction(dataFirmantes);
  };

  const onAllRowsUnselectRep = () => {
    setSelectedRepresentante([]);
    onFunction([]);
  };

  const getRepresentantesList = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!isEmpty(queryState)) {
        const res = await representanteByEmpresaIdGet(queryState, empresaId);
        res && setDataFirmantes(res.items);
      }
    } catch (e) {
      notifications.unknownError(e);
    } finally {
      setIsLoading(false);
    }
  }, [empresaId, queryState, representanteByEmpresaIdGet]);

  useEffect(() => {
    if (empresaId) {
      getRepresentantesList();
    }
  }, [empresaId, getRepresentantesList]);

  return (
    <>
      <p>{title}</p>
      <TurboTable
        selectionMode="multiple"
        value={dataFirmantes}
        totalRecords={dataFirmantes?.length}
        columns={columns}
        scrollable
        scrollHeight="flex"
        showSelectTable={false}
        selection={selectedRepresentante}
        onRowSelect={onRowSelectRep}
        onRowUnselect={onRowUnselectRep}
        onAllRowsSelect={onAllRowsSelectRep}
        onAllRowsUnselect={onAllRowsUnselectRep}
        showSelectAll
        multiple
        showSelectColumns={false}
        showHeader={false}
        isLoading={isLoading}
        setQueryState={setQueryState}
      />
    </>
  );
};
