import React from 'react';

import DocumentacionRequerida from 'components/DocumentacionRequerida';
import { TABLA_DOC_REQUERIDA_KEYS } from 'components/tables/TableDocumentacionRequerida/constants/columns';

const DocumentacionRequeridaDevolucion = ({
  data,
  loading,
  title,
  isRedirect,
}) => {
  return (
    <DocumentacionRequerida
      tableKey={TABLA_DOC_REQUERIDA_KEYS.OPERACION}
      data={data}
      loading={loading}
      title={title}
      isRedirect={isRedirect}
      withOnRowAction={false}
    />
  );
};

export default DocumentacionRequeridaDevolucion;
