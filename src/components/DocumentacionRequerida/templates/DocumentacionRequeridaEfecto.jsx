import React from 'react';

import DocumentacionRequerida from 'components/DocumentacionRequerida';
import { TABLA_DOC_REQUERIDA_KEYS } from 'components/tables/TableDocumentacionRequerida/constants/columns';

const DocumentacionRequeridaEfecto = ({ data, loading, handleUpload }) => {
  return (
    <DocumentacionRequerida
      tableKey={TABLA_DOC_REQUERIDA_KEYS.EFECTO}
      data={data}
      loading={loading}
      handleUpload={(file, rowData) => {
        handleUpload(file, rowData, 'efecto');
      }}
      title={
        <>
          Documentación requerida:{' '}
          <div className="inline-block text-black">Efecto</div>
        </>
      }
    />
  );
};

export default DocumentacionRequeridaEfecto;
