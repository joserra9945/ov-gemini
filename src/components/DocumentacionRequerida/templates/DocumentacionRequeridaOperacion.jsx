import DocumentacionRequerida from 'components/DocumentacionRequerida';
import { TABLA_DOC_REQUERIDA_KEYS } from 'components/tables/TableDocumentacionRequerida/constants/columns';

const DocumentacionRequeridaOperacion = ({
  data,
  loading,
  handleUpload,
  title,
}) => {
  return (
    <DocumentacionRequerida
      tableKey={TABLA_DOC_REQUERIDA_KEYS.OPERACION}
      data={data}
      loading={loading}
      handleUpload={(file, rowData) => {
        handleUpload(file, rowData);
      }}
      title={title}
      withOnRowAction={false}
    />
  );
};

export default DocumentacionRequeridaOperacion;
