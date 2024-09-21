import { nanoid } from 'nanoid';

import { IColumn, IDocumento } from '@shared/interfaces';
import { EstadoDocumentoTemplate, StringTemplate } from '@shared/templates';

export const TABLA_DOC_REQUERIDA_KEYS = {
  EMPRESA: 'empresa',
  EFECTO: 'efecto',
  OPERACION: 'operacion',
};

export const columns = (onSelectRow: (arg: IDocumento) => void): IColumn[] => {
  return [
    {
      key: nanoid(),
      field: 'tipoDocumentoNombre',
      header: 'Documento',
      className: 'w-8/12',
      body: ({
        tipoDocumentoNombre,
        detalle,
        cesionId,
        cesionNumero,
      }: IDocumento) => {
        const aclaracion = cesionId
          ? `- ${cesionNumero}`
          : detalle
          ? `- ${detalle}`
          : '';
        return (
          <StringTemplate
            text={`${tipoDocumentoNombre} ${aclaracion ?? '-'}`}
          />
        );
      },
    },
    {
      key: nanoid(),
      header: 'Estado',
      body: ({ motivoRechazo, pendienteValidar }: IDocumento) => {
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
    },
    {
      key: nanoid(),
      header: '',
      body: (rowData: IDocumento) => (
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
};
