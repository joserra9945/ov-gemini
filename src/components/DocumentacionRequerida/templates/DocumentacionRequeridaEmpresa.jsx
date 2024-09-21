import DocumentacionRequerida from 'components/DocumentacionRequerida';
import { TABLA_DOC_REQUERIDA_KEYS } from 'components/tables/TableDocumentacionRequerida/constants/columns';

const DocumentacionRequeridaEmpresa = ({
  data,
  loading,
  handleUpload,
  fetchDataEmpresa,
}) => {
  return (
    <DocumentacionRequerida
      tableKey={TABLA_DOC_REQUERIDA_KEYS.EMPRESA}
      data={data}
      fetchDataEmpresa={fetchDataEmpresa}
      loading={loading}
      handleUpload={(file, rowData) => {
        handleUpload(file, rowData, 'empresa');
      }}
      title="Documentación requerida: Empresa"
    />
  );
};

export default DocumentacionRequeridaEmpresa;
