import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import OperacionesService from 'utils/services/operaciones-service';
import { faFile } from '@fortawesome/pro-light-svg-icons';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWindowSize from '@shared/hooks/useWindowsSize';
import { parseToColumns } from '@shared/utils/utilsOv';

import { Button as GButton } from '@shared/components/Legacy/Button';

import Badge from 'components/Badge';
import TableWrapper from 'components/TableWrapper';

import {
  desktopColumns,
  mobileDataViewColumns,
  mobileTableColumns,
} from './constants';

import './TableOperacionesHistorial.scss';

const operacionesService = new OperacionesService();

const TableOperacionesHistorial = ({ setDisableHistorial }) => {
  const [operaciones, setOperaciones] = useState({ items: [] });
  const [paramOperaciones, setParamOperaciones] = useState({
    MaxResultCount: 100,
    SkipCount: 0,
  });
  const [first, setFirst] = useState(0);
  const [loading, setLoading] = useState(true);
  const [definitiveColumns, setDefinitiveColumns] = useState(null);
  const windowSize = useWindowSize();
  const [expandedRows, setExpandedRows] = useState([]);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await operacionesService.getOperacionesClienteByParamsHistoric(
      paramOperaciones
    );
    if (res) {
      setOperaciones(res);
    }
    setLoading(false);
  }, [paramOperaciones]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!operaciones.length) {
      setDisableHistorial();
    }
  }, [operaciones, setDisableHistorial]);

  useEffect(() => {
    if (!definitiveColumns) {
      const tmpColums = [];
      desktopColumns.forEach((column) => {
        const tmpColumn = column;
        tmpColums.push(tmpColumn);
      });
      setDefinitiveColumns(tmpColums);
    }
  }, [definitiveColumns]);

  // #region events
  const onpageChange = (event) => {
    setParamOperaciones({
      ...paramOperaciones,
      SkipCount: event.first,
    });
    setFirst(event.first);
  };
  // #endregion

  const dynamicColumns = parseToColumns(definitiveColumns);

  const dynamicMobileColumns = parseToColumns(mobileTableColumns);

  const rowExpansionTemplate = (data) => {
    return <DataTable value={[data]}>{dynamicMobileColumns}</DataTable>;
  };

  const onRowSelect = (e) => {
    navigate(`/ficha-operacion/${e.value.id}/`, { state: { data: e.value } });
  };

  const documentacionRequeridaButton = (rowData) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="doc-requerida-button-operaciones"
      style={{ display: 'inline-block' }}
      role="button"
      tabIndex="-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!rowData.documentosPendientesAmount)
          onRowSelect({ value: rowData });
      }}
    >
      <GButton
        data-id="documentacion-requerida-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRowSelect({ value: rowData });
        }}
        color="light"
        icon={faFile}
        backgroundColor="white"
        disabled={!rowData.documentosPendientesAmount}
        rounded="sm"
        tooltipText={`${rowData.documentosPendientesAmount} documentos pendientes`}
      />
      <Badge
        value={<FontAwesomeIcon color="red" icon={faCircleExclamation} />}
      />
    </div>
  );

  const actionsColumn = (rowData) => {
    return (
      <div className="actions-wrapper justify-content-end">
        {documentacionRequeridaButton(rowData)}
      </div>
    );
  };

  if (!operaciones) {
    return (
      <div>
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <TableWrapper data={operaciones?.items} isLoading={loading}>
      <div className="datatable-component datatable-responsive datatable--operaciones-historial">
        <DataTable
          id="operaciones-historial-table"
          value={operaciones?.items}
          lazy
          paginator={operaciones?.length > paramOperaciones?.MaxResultCount}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          rows={paramOperaciones?.MaxResultCount}
          first={first}
          onPage={onpageChange}
          onSelectionChange={(e) => onRowSelect(e)}
          currentPageReportTemplate="Hay un total de {totalRecords} operaciones"
          totalRecords={operaciones.totalCount ? operaciones.totalCount : 0}
          onRowToggle={(e) => setExpandedRows(e.data)}
        >
          {dynamicColumns}
          <Column
            className="column-center"
            body={(rowData) => actionsColumn(rowData)}
          />
        </DataTable>
      </div>
    </TableWrapper>
  );
};

export default TableOperacionesHistorial;
