import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';
import EfectoService from 'utils/services/efectos-service';
import GenerarContratoService from 'utils/services/generar-contrato-service';
import VerificacionesService from 'utils/services/verificaciones-service';
import {
  faAddressBook,
  faCheckSquare,
  faFile,
  faShareSquare,
} from '@fortawesome/pro-light-svg-icons';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '@shared/components/Modal';
import useWindowSize from '@shared/hooks/useWindowsSize';
import { estadosOperaciones } from '@shared/utils/constants';
import { parseToColumns } from '@shared/utils/utilsOv';

import { Button as GButton } from '@shared/components/Legacy/Button';

import Badge from 'components/Badge';
import TableWrapper from 'components/TableWrapper';

import FormasContactoModal from './components/FormasContactoPorLibrados/FormasContactoModal';
import { desktopColumns } from './constants';
import OverlayBodyVerificaciones from './OverlayBodyVerificaciones';

import './TableOperacionesActivas.scss';

const efectoService = new EfectoService();
const verificacionesService = new VerificacionesService();
const generarContratoService = new GenerarContratoService();

const TableOperacionesActivas = ({ isAdUser, isLoading, operaciones }) => {
  const navigate = useNavigate();
  const [verificacionesState, setVerificacionesState] = useState([]);
  const [disableReenviar, setDisableReenviar] = useState(false);
  const [definitiveColumns, setDefinitiveColumns] = useState(null);
  const [operacionActiva, setOperacionActiva] = useState(null);
  const windowSize = useWindowSize();
  const op = useRef(null);
  const [modalOperacionesActivas, setModalOperacionesActivas] = useState(false);
  const reenviarContrato = async (e, rowData) => {
    setDisableReenviar(true);
    e.persist();
    e.stopPropagation();
    e.preventDefault();
    await generarContratoService.signContratoByOperacionId(rowData.id);
    setDisableReenviar(false);
  };

  const checkVerificaciones = async (e, rowData) => {
    e.persist();
    e.stopPropagation();
    e.preventDefault();
    const res = await efectoService.getAllEfectoByOperacionId(rowData?.id);
    if (res?.items?.length > 0) {
      const success =
        await verificacionesService.getVerificacionesRejectionReasons(
          res.items
        );
      if (success) {
        setVerificacionesState(success);
        op.current.toggle(e);
      }
    }
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
        data-id="operaciones-documentos-pendientes-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRowSelect({ value: rowData });
        }}
        color="light"
        icon={faFile}
        disabled={!rowData.documentosPendientesAmount}
        rounded="sm"
        tooltipText={`${rowData.documentosPendientesAmount} documentos pendientes`}
      />
      <Badge
        value={<FontAwesomeIcon color="red" icon={faCircleExclamation} />}
      />
    </div>
  );

  const buttonTemplate = (rowData) => {
    if (rowData.estado !== estadosOperaciones.PAGADA) return;
    return (
      <>
        <Button
          data-id="reenviar-contrato-btn"
          className=""
          onClick={(e) => reenviarContrato(e, rowData)}
          tooltip="Reenviar contrato"
          disabled={disableReenviar}
          tooltipOptions={{
            position: 'bottom',
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
          style={{ padding: '12px 10px 12px 10px' }}
        >
          <FontAwesomeIcon color="white" icon={faShareSquare} />
        </Button>
        <Button
          data-id="comprobar-verificaciones-btn"
          icon={faCheckSquare}
          className=""
          onClick={(e) => checkVerificaciones(e, rowData)}
          tooltip="Comprobar verficaciones"
          tooltipOptions={{
            position: 'bottom',
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
        />
        <OverlayPanel ref={op} appendTo={document.body}>
          <OverlayBodyVerificaciones data={verificacionesState} />
        </OverlayPanel>
      </>
    );
  };

  const operacionesActivasFormaContacto = (rowData) => {
    return (
      <div className="h-[40px] w-[40px]">
        <GButton
          className="h-[40px] w-[40px]"
          data-id="formasContacto-activas-id"
          onClick={(e) => {
            setOperacionActiva(rowData);
            e.preventDefault();
            e.stopPropagation();
            setModalOperacionesActivas(true);
          }}
          color="light"
          icon={faAddressBook}
          rounded="sm"
          tooltipText="Formas de contacto"
        />
      </div>
    );
  };

  const actionsColumn = (rowData, e) => {
    return (
      <div
        className="flex flex-row gap-4 actions-wrapper justify-content-end"
        data-id="operaciones-actions-buttons"
      >
        {operacionesActivasFormaContacto(rowData)}
        {documentacionRequeridaButton(rowData)}
        {isAdUser && buttonTemplate(rowData)}
      </div>
    );
  };

  useEffect(() => {
    if (!definitiveColumns) {
      const tmpColums = [];
      desktopColumns.forEach((column) => {
        const tmpColumn = column;
        tmpColums.push(tmpColumn);
      });
      setDefinitiveColumns(tmpColums);
    }
  }, [definitiveColumns, windowSize.width]);

  return (
    <>
      <TableWrapper data={operaciones?.items} isLoading={isLoading}>
        <div className="datatable-component datatable-responsive datatable--operaciones">
          <DataTable
            id="operaciones-activas-table"
            value={operaciones?.items}
            onSelectionChange={(e) => onRowSelect(e)}
            selectionMode="single"
          >
            {parseToColumns(definitiveColumns)}
            <Column body={(rowData) => actionsColumn(rowData)} />
          </DataTable>
        </div>
      </TableWrapper>
      <Modal
        className="w-1/2"
        header="Información de contacto de su cliente"
        open={modalOperacionesActivas}
        onClose={() => setModalOperacionesActivas(false)}
      >
        <FormasContactoModal
          operacionActiva={operacionActiva}
          closeModal={() => setModalOperacionesActivas(false)}
        />
      </Modal>
    </>
  );
};

TableOperacionesActivas.propTypes = {};

export default TableOperacionesActivas;
