/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import EfectoService from 'utils/services/efectos-service';
import { faEye, faFile, faPlus } from '@fortawesome/pro-light-svg-icons';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CargaMasiva from '@shared/components/CargaMasiva';
import { deniedEffect, estadoEfectoCliente } from '@shared/utils/constants';
import { isSelectableEffect, parseToColumns } from '@shared/utils/utilsOv';

import { Button as GButton } from '@shared/components/Legacy/Button';

import Badge from 'components/Badge';
import { tabMenuItemsEnum } from 'components/DetalleEfecto/constants';

import { desktopColumns } from './constants';

import './tableOperacionEfectos.scss';

const efectoService = new EfectoService();

const EFECTOS_TABLE_IDS = {
  ACTIVAS: 1,
  HISTORIAL: 2,
};

const TableOperacionEfectos = ({
  data,
  sinAsignar,
  selectedEfectos,
  setSelectedEfectos,
  addDocumentation,
  showActions = true,
  footer,
  footerDesktop,
  isLoading,
  fetchEfectosWithoutOperacion,
  selectedTable,
  setShowCarga,
  showCarga,
}) => {
  const [efectos, setEfectos] = useState(null);
  const navigate = useNavigate();
  const table = useRef();
  const [definitiveColumns, setDefinitiveColumns] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

  const [efectoConCargaMasiva, setEfectoConCargaMasivaCargaMasiva] = useState();

  const efectoCargaMasiva = useCallback(
    (efecto) => {
      setShowCarga(true);
      setEfectoConCargaMasivaCargaMasiva(efecto);
    },
    [setShowCarga]
  );

  const goToDetalle = (e, rowData, tab) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/detalle/efecto/${rowData.id}`, {
      state: {
        tipoEfecto: rowData?.tipo?.id,
        tab,
      },
    });
  };

  const preSelectItems = useCallback(() => {
    if (!data.length && setSelectedEfectos) {
      return setSelectedEfectos([]);
    }

    const seleccionable = data.find((row) => isSelectableEffect(row));
    if (!seleccionable) return;

    const newSelection = data.filter((efecto) =>
      isSelectableEffect(efecto, seleccionable.tipo?.id)
    );

    setSelectedEfectos &&
      selectedTable === EFECTOS_TABLE_IDS.ACTIVAS &&
      setSelectedEfectos(newSelection);
  }, [data, selectedTable, setSelectedEfectos]);

  useEffect(() => {
    const fetchEfectosEstudioAndPreselect = async () => {
      const efectosIds = data.reduce((acc, row) => {
        if (row.estadoEfectoClienteId === estadoEfectoCliente.PENDIENTE) {
          acc.push(row.id);
        }
        return acc;
      }, []);
      if (efectosIds?.length) {
        const res = await efectoService.putUpdateScoring(efectosIds);
        if (res) {
          fetchEfectosWithoutOperacion && fetchEfectosWithoutOperacion(true);
        }
      }
    };
    if (data) {
      fetchEfectosEstudioAndPreselect();
    }
  }, [data, fetchEfectosWithoutOperacion]);

  useEffect(() => {
    if (data) {
      preSelectItems();
    }
  }, [data, preSelectItems]);

  useEffect(() => {
    if (!definitiveColumns) {
      const tmpColums = [];
      desktopColumns(efectoCargaMasiva).forEach((column) => {
        const tmpColumn = column;
        if (column?.header.toLowerCase() === 'tipo') {
          tmpColumn.hidden = !sinAsignar;
        }
        tmpColums.push(tmpColumn);
      });

      setDefinitiveColumns(tmpColums);
    }
  }, [definitiveColumns, efectoCargaMasiva, sinAsignar]);

  const renderAddDocButton = (rowData) => {
    if (rowData?.documentosPendientesCount > 0 && EFECTOS_TABLE_IDS.ACTIVAS) {
      return (
        <div
          className="doc-requerida-button-efectos"
          style={{ display: 'inline-block' }}
          role="button"
          tabIndex="-1"
          onClick={(e) =>
            goToDetalle(e, rowData, tabMenuItemsEnum.DOC_REQUERIDA)
          }
        >
          <GButton
            data-id="documentos-pendientes-efecto"
            color="light"
            icon={faFile}
            disabled={!rowData?.documentosPendientesCount}
            rounded="sm"
            tooltipText={`${rowData?.documentosPendientesCount} documentos pendientes`}
          />
          <Badge
            value={<FontAwesomeIcon color="red" icon={faCircleExclamation} />}
          />
        </div>
      );
    }
    return (
      <GButton
        onClick={(e) => addDocumentation(e, rowData)}
        className="efectos-action-button"
        icon={faPlus}
        color="light"
        tooltipText="Añadir documentos"
      />
    );
  };

  const actionsTemplate = (rowData) => {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="actions-wrapper justify-content-end"
        data-id="efectos-actions-buttons"
      >
        {!deniedEffect.includes(rowData.estadoFinanciacionId) &&
          selectedTable === EFECTOS_TABLE_IDS.ACTIVAS &&
          renderAddDocButton(rowData)}

        <GButton
          data-id="efecto-detalle-btn"
          onClick={(e) =>
            goToDetalle(e, rowData, tabMenuItemsEnum.DATOS_EFECTO)
          }
          className="efectos-action-button"
          icon={faEye}
          color="light"
          tooltipText="Ver detalles"
        />
      </div>
    );
  };

  const checkState = useCallback(
    (efecto) => {
      if (
        selectedEfectos?.length &&
        !isSelectableEffect(efecto, selectedEfectos[0]?.tipo?.id)
      ) {
        return null;
      }
      if (
        !deniedEffect.includes(efecto.estadoFinanciacionId) &&
        ![
          estadoEfectoCliente.PENDIENTE,
          estadoEfectoCliente.RECHAZADO,
          estadoEfectoCliente.PERDIDO,
        ].includes(efecto.estadoEfectoClienteId)
      ) {
        return isSelectableEffect(efecto, selectedEfectos[0]?.tipo?.id);
      }
    },
    [selectedEfectos]
  );

  const showSelectionElement = (rowData) => {
    if (selectedTable === EFECTOS_TABLE_IDS.ACTIVAS || !selectedTable) {
      return checkState(rowData);
    }
  };

  useEffect(() => {
    if (sinAsignar) return;
    efectoService.getAllEfectoByOperacionId(data?.id).then((success) => {
      if (success) {
        // eslint-disable-next-line no-param-reassign
        setEfectos(success.items);
      }
    });
  }, [sinAsignar, data.id]);

  return (
    <>
      <div
        className={`datatable-responsive ${
          sinAsignar ? 'datatable-component' : 'subtabla'
        }`}
      >
        {showCarga ? (
          <div className="p-4" id="efectos-sin-asignar-table">
            <CargaMasiva
              columns={definitiveColumns}
              efecto={efectoConCargaMasiva}
              showCarga={showCarga}
              setShowCarga={setShowCarga}
            />
          </div>
        ) : (
          <DataTable
            id="efectos-sin-asignar-table"
            ref={table}
            loading={isLoading}
            selectionMode="checkbox"
            selection={selectedEfectos}
            footer={footer}
            emptyMessage="No tiene efectos creados"
            showSelectionElement={showSelectionElement}
            onRowToggle={(e) => setExpandedRows(e.data)}
            onSelectionChange={(e) => {
              if (Array.isArray(e.value)) {
                setSelectedEfectos(e.value.filter((x) => checkState(x)));
              } else {
                navigate(`/efecto/${e?.value?.tipo?.id}/${e?.value?.id}`);
              }
            }}
            dataKey="id"
            value={sinAsignar ? data : efectos}
          >
            {sinAsignar ? (
              <Column
                selectionMode="multiple"
                style={{ flexGrow: 1, flexBasis: '6%', width: '6%' }}
                className="table__selection-column"
              />
            ) : (
              <Column style={{ width: '3em' }} selectionMode="multiple" />
            )}
            {parseToColumns(definitiveColumns)}
            {showActions && (
              <Column className="action-buttons" body={actionsTemplate} />
            )}
          </DataTable>
        )}
      </div>
      {!showCarga && footerDesktop}
    </>
  );
};

TableOperacionEfectos.propTypes = {};

export default TableOperacionEfectos;
