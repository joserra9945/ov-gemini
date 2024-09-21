import { nanoid } from 'nanoid';

import { IColumn, IDocumento } from '@shared/interfaces';
import {
  EstadoDocumentoTemplate,
  FechaTemplate,
  StringTemplate,
} from '@shared/templates';
import EstadoDocumentoCesionFirmaTemplate from '@shared/templates/EstadoDocumentoCesionFirmaTemplate';

export const columns: IColumn[] = [
  {
    key: nanoid(),
    header: 'Fecha creación',
    body: ({ lastModificationTime }: IDocumento) =>
      lastModificationTime ? (
        <FechaTemplate fecha={lastModificationTime.toString()} />
      ) : (
        '-'
      ),
  },
  {
    key: nanoid(),
    header: 'Fecha firma',
    body: ({ fechaFirma }: IDocumento) =>
      fechaFirma ? <FechaTemplate fecha={fechaFirma.toString()} /> : '-',
  },
  {
    key: nanoid(),
    header: 'Tipo',
    body: ({ tipoDocumentoNombre }: IDocumento) =>
      tipoDocumentoNombre ? <StringTemplate text={tipoDocumentoNombre} /> : '-',
  },
  {
    key: nanoid(),
    header: 'Estado revisión',
    body: ({
      estadoRevisionDescripcion,
      estadoRevisionId,
      estadoRevisionNombre,
    }: IDocumento) =>
      estadoRevisionId && estadoRevisionNombre ? (
        <EstadoDocumentoTemplate
          estadoRevisionDescripcion={estadoRevisionDescripcion}
          estadoRevisionId={estadoRevisionId}
          estadoRevisionNombre={estadoRevisionNombre}
        />
      ) : (
        '-'
      ),
  },
  {
    key: nanoid(),
    header: 'Estado firma',
    body: ({ estadoFirma }: IDocumento) =>
      estadoFirma ? (
        <EstadoDocumentoCesionFirmaTemplate
          id={estadoFirma.id}
          description={estadoFirma.description}
        />
      ) : (
        '-'
      ),
  },
];
