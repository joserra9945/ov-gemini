const EstadoDocumentoTemplate = (rowData) => (
  <div
    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    className={`estado-documento-revision-${rowData.estadoRevisionId}`}
  >
    <span>
      {rowData.estadoRevisionNombre
        ? rowData.estadoRevisionNombre
        : 'Sin estado'}
    </span>
  </div>
);

export default EstadoDocumentoTemplate;
