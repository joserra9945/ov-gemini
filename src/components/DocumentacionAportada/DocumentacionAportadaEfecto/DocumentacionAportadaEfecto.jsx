import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { isNull } from 'lodash';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';
import EfectoService from 'utils/services/efectos-service';
import FacturasService from 'utils/services/facturas-service';
import {
  faDownload,
  faFileExcel,
  faInfo,
  faUndo,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  estadosRevisionDocumentos,
  tipoDocumentoString,
} from '@shared/utils/constants';
import notifications from '@shared/utils/notificationsOv';
import { downloadFileFromBinary } from '@shared/utils/utils';

import { Button } from '@shared/components/Legacy/Button';
import { TurboTable } from '@shared/components/Legacy/TurboTable';

import { tableColumns } from 'components/DocumentViewer/tableColumns';

import './documentacionAportada.scss';

const efectoService = new EfectoService();
const facturasService = new FacturasService();
const documentoEfectoService = new DocumentoEfectoService();

const DocumentacionAportadaEfecto = ({
  efecto,
  setDocumentoEfecto,
  fetchEfecto,
  refreshDocumentos,
}) => {
  const { isAdUser } = useSelector((store) => store.userState);
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [indexDocumento, setIndexDocumento] = useState(null);
  const [finalColumns, setFinalColumns] = useState(null);

  const fetchDocumentos = useCallback(
    async (id) => {
      let facturasAsociadas;
      let effectFile;

      try {
        if (!efecto?.esFicticio) {
          effectFile = await efectoService.getFicheroInPDFById(id);
          setIndexDocumento(0);
        }
        if (efecto?.hasFichero) {
          const tmpFacturas = await facturasService.getFacturaByPagareId(id);
          facturasAsociadas = tmpFacturas.items?.map((facturaPagare) => ({
            ...facturaPagare,
            tipoDocumentoId: tipoDocumentoString.FACTURA_PAGARE,
          }));
        }
        const res =
          await documentoEfectoService.getDocumentosDeEfectoVistaClienteById(
            id,
            '?MaxResultCount=100'
          );
        if (res) {
          const totalDocuments = [
            {
              motivoRequerimiento: '',
              tipoDocumentoNombre: efecto.tipoDocumentoNombre,
              tipoDocumentoId: efecto.tipoDocumentoId,
              estadoRevisionId: efecto.estadoRevisionId,
              estadoRevisionNombre: efecto.estadoRevisionNombre,
              estadoRevisionDescripcion: efecto.estadoRevisionDescripcion,
              id: efecto.id,
              hasFichero: efecto.hasFichero,
              esFicticio: efecto.esFicticio,
              file: effectFile,
            },
          ];
          const finalDocuments = [
            ...totalDocuments,
            ...(facturasAsociadas || []),
            ...(res?.items || []),
          ];
          setDocumentos({
            items: finalDocuments,
            totalCount: finalDocuments.length,
          });
          setDocumentoEfecto(finalDocuments[0].file);
        }
      } catch {
        setDocumentos({
          items: [],
          totalCount: 0,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [efecto, setDocumentoEfecto]
  );

  const fetchFile = async (rowData) => {
    const file = await documentoEfectoService.getFicheroInPDFById(rowData?.id);
    return file || null;
  };

  const onRowSelect = async (rowData) => {
    if (rowData?.index !== indexDocumento) {
      const tmpFile = await fetchFile(rowData?.data);
      setDocumentoEfecto(tmpFile);
      setIndexDocumento(rowData?.index);
    }
  };

  const ficheroInexistente = (rowData) =>
    rowData?.esFicticio ? (
      <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '1.5em' }} />
    ) : null;

  const resetEstadoRevisionDocumento = useCallback(
    async (data) => {
      await documentoEfectoService.setEstadoRevisionDocumentoById(
        estadosRevisionDocumentos.Pendiente,
        data.id,
        data.tipoDocumentoId
      );
      setDocumentos([]);
      setIsLoading(true);
      await fetchEfecto();
      await fetchDocumentos(data.id);

      notifications.success({
        title: '¡Éxito!',
        body: 'Estado restaurado correctamente.',
      });
    },
    [fetchDocumentos, fetchEfecto]
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const Buttons = (rowData) => {
    const { data } = rowData;
    return (
      <span className="table-actions__container d-flex flex-row">
        <Button
          onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            downloadFileFromBinary({
              file: await fetchFile(data),
              tipoDocumentoNombre:
                data?.tipoDocumentoNombre || data?.tipoDocumento.description,
            });
          }}
          className="efectos-action-button"
          color="light"
          icon={faDownload}
          size="xl"
          tooltipText="Descargar"
        />
        {isAdUser &&
          (data.estadoRevisionId !== estadosRevisionDocumentos.Pendiente ||
            data.estadoRevision?.id !==
              estadosRevisionDocumentos.Pendiente) && (
            <Button
              onClick={() => {
                resetEstadoRevisionDocumento(data);
              }}
              className="efectos-action-button"
              color="light"
              icon={faUndo}
              size="xl"
              // tooltipText="Reiniciar estado de revisión"
            />
          )}

        {data.tipoDocumento?.id.toString() ===
          tipoDocumentoString.FACTURA_PAGARE ||
          (data.tipoDocumentoId?.toString() ===
            tipoDocumentoString.FACTURA_PAGARE && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/detalle/efecto/${data.id}`, {
                  state: {
                    tipoEfecto: data.tipoDocumentoId || data.tipoDocumento?.id,
                  },
                });
              }}
              className="efectos-action-button"
              color="light"
              icon={faInfo}
              size="xl"
              tooltipText="Detalle de la factura"
            />
          ))}
      </span>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components, react-hooks/exhaustive-deps
  const OpcionesTemplate = (rowData) => <Buttons data={rowData} />;

  useEffect(() => {
    if (efecto) {
      fetchDocumentos(efecto?.id);
    }
  }, [efecto, fetchDocumentos, refreshDocumentos]);

  useEffect(() => {
    if (!finalColumns) {
      const fColumns = [
        {
          id: 'document-viewer__fichero-inexistente',
          header: '',
          body: ficheroInexistente,
          style: { flexBasis: '16%', width: '16%' },
        },
        ...tableColumns,
        {
          id: 'document-viewer__acciones',
          header: '',
          body: OpcionesTemplate,
          style: { flexBasis: '21%', width: '21%' },
          className: 'justify-content-end',
        },
      ];
      setFinalColumns(fColumns);
    }
  }, [OpcionesTemplate, finalColumns]);

  if (isNull(documentos)) {
    return (
      <div className="text-center p-4">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="documentación-aportada-efecto__container">
      <TurboTable
        columns={finalColumns}
        isLoading={!documentos || isLoading}
        value={documentos.items}
        totalRecords={documentos.totalCount}
        showSelectColumns={false}
        scrollHeight="500px"
        scrollable
        showFilter={false}
        onRowClick={(e) => {
          onRowSelect(e);
        }}
        selectionMode="single"
      />
    </div>
  );
};

export default DocumentacionAportadaEfecto;
