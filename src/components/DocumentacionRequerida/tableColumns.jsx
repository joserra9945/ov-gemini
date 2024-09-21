import { nanoid } from 'nanoid';

import { EstadoDocumentoTemplate, StringTemplate } from '@shared/templates';
import EstadoFirmaDocumentoTemplate from '@shared/templates/EstadoFirmaDocumentoTemplate';

import {
  FechaModificacionTemplate,
  MotivoTemplate,
  TipoDocumentoTemplate,
} from 'components/tables/TableDocumentacionRequerida/Templates';

export const tableColumns = (OpcionesTemplate, FicheroNoExisteTemplate) => [
  {
    id: nanoid(),
    header: '',
    body: FicheroNoExisteTemplate,
    style: { flexGrow: 1, flexBasis: '2rem', width: '2rem' },
  },
  {
    id: 'document-viewer__tipo',
    header: 'Documento',
    body: TipoDocumentoTemplate,
  },
  {
    id: 'document-viewer__estado',
    header: 'Estado',
    body: ({
      estadoRevisionId,
      estadoRevisionNombre,
      estadoRevisionDescripcion,
    }) => (
      <EstadoDocumentoTemplate
        estadoRevisionDescripcion={estadoRevisionDescripcion}
        estadoRevisionNombre={estadoRevisionNombre}
        estadoRevisionId={estadoRevisionId}
      />
    ),
  },
  {
    id: 'document-viewer__motivo-rechazo',
    header: 'Estado firma',
    body: ({ estadoFirma }) => (
      <EstadoFirmaDocumentoTemplate estadoFirma={estadoFirma} />
    ),
  },
  {
    id: nanoid(),
    body: OpcionesTemplate,
    header: 'Opciones',
  },
];

export const empresaTableColumns = [
  {
    id: 'document-viewer__tipo',
    header: 'Tipo',
    className: 'tipo__documento',
    body: TipoDocumentoTemplate,
    style: { flexGrow: 1, flexBasis: '56%', width: '56%' },
  },
  {
    id: nanoid(),
    header: 'Fecha',
    className: 'fecha__documento',
    body: FechaModificacionTemplate,
    style: { flexGrow: 1, flexBasis: '14%', width: '14%' },
  },
  {
    id: 'document-viewer__motivo-rechazo',
    align: 'center',
    header: 'Motivo',
    className: 'motivo-rechazo__documento',
    body: MotivoTemplate,
    style: { flexGrow: 1, flexBasis: '28%', width: '28%' },
  },
];

export const operacionTableColumns = (onSelectRow) => [
  {
    id: nanoid(),
    header: 'Tipo',
    field: 'tipoDocumentoNombre',
    className: 'w-3/12',
    body: TipoDocumentoTemplate,
    style: { flexGrow: 1, flexBasis: '28%', width: '28%' },
  },
  {
    id: nanoid(),
    header: 'Razón social',
    body: ({ detalle }) => <StringTemplate text={`${detalle || '-'}`} />,
    className: 'w-5/12',
    style: { flexGrow: 1, flexBasis: '28%', width: '28%' },
  },
  {
    id: nanoid(),
    header: 'Estado',
    className: 'w-2/12',
    body: ({ motivoRechazo, pendienteValidar }) => {
      return motivoRechazo ? (
        <EstadoDocumentoTemplate
          estadoRevisionId={3}
          estadoRevisionNombre="Rechazado"
          estadoRevisionDescripcion={`Rechazado por: ${motivoRechazo}`}
        />
      ) : pendienteValidar ? (
        <EstadoDocumentoTemplate
          estadoRevisionId={1}
          estadoRevisionNombre="Pendiente de validar"
        />
      ) : (
        <EstadoDocumentoTemplate
          estadoRevisionId={4}
          estadoRevisionNombre="Pendiente de subir"
        />
      );
    },
    align: 'center',
    style: { flexGrow: 1, flexBasis: '28%', width: '28%' },
  },
  {
    key: nanoid(),
    header: '',
    className: 'w-2/12',
    body: (rowData) => (
      <button
        type="button"
        className="w-36 bg-primary rounded-md text-white py-2 px-4 hover:bg-primary-over"
        onClick={() => onSelectRow(rowData)}
      >
        Subir archivo
      </button>
    ),
  },
];

export const efectoTableColumns = (onSelectRow) => [
  {
    key: nanoid(),
    field: 'tipoDocumentoNombre',
    header: 'Documento',
    className: 'w-8/12',
    body: ({ tipoDocumentoNombre, detalle }) => (
      <StringTemplate text={`${tipoDocumentoNombre} ${detalle || ''}` || ''} />
    ),
  },
  {
    id: nanoid(),
    header: 'Estado',
    className: 'w-2/12',
    body: ({ motivoRechazo, pendienteValidar }) => {
      return motivoRechazo ? (
        <EstadoDocumentoTemplate
          estadoRevisionId={3}
          estadoRevisionNombre="Rechazado"
          estadoRevisionDescripcion={`Rechazado por: ${motivoRechazo}`}
        />
      ) : pendienteValidar ? (
        <EstadoDocumentoTemplate
          estadoRevisionId={1}
          estadoRevisionNombre="Pendiente de validar"
        />
      ) : (
        <EstadoDocumentoTemplate
          estadoRevisionId={4}
          estadoRevisionNombre="Pendiente de subir"
        />
      );
    },
    align: 'center',
    style: { flexGrow: 1, flexBasis: '28%', width: '28%' },
  },
  {
    key: nanoid(),
    header: '',
    className: 'w-2/12',
    body: (rowData) => (
      <button
        type="button"
        className="w-36 bg-primary rounded-md text-white py-2 px-4 hover:bg-primary-over"
        onClick={() => onSelectRow(rowData)}
      >
        Subir archivo
      </button>
    ),
  },
];
