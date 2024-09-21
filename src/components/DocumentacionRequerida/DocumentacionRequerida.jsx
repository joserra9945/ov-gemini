import { Button } from 'primereact/button';
import { faEye, faPlus } from '@fortawesome/pro-light-svg-icons';

import TableDocumentacionRequerida from 'components/tables/TableDocumentacionRequerida';

import './styles.scss';

const DocumentacionRequerida = ({
  tableKey,
  data,
  buttonBar = false,
  handleUpload,
  buttonVerFunc,
  buttonAddFunc,
  columns,
  loading,
  title,
  isRedirect = false,
  fetchDataEmpresa,
  withOnRowAction,
}) => {
  return (
    <div className="documentacionRequerida">
      <div className="card">
        <div className="header-table">
          <h3 className="title-h3">{title || 'Documentación requerida'}</h3>
          {buttonBar && (
            <div className="superior-buttonbar">
              <Button
                icon={faEye}
                className="p-button p-component p-button p-button-raised"
                onClick={buttonVerFunc}
                label="Ver"
              />
              <Button
                icon={faPlus}
                className="p-button p-component p-button p-button-raised"
                onClick={buttonAddFunc}
                label="Añadir"
              />
            </div>
          )}
        </div>
        <TableDocumentacionRequerida
          tableKey={tableKey}
          data={data}
          fetchDataEmpresa={fetchDataEmpresa}
          columns={columns}
          handleUpload={handleUpload}
          loading={loading}
          isRedirect={isRedirect}
          withOnRowAction={withOnRowAction}
        />
      </div>
    </div>
  );
};

export default DocumentacionRequerida;
