const FirmaManualDevolverPagare = ({
  devolucionPagareId,
  uploadDevolverPagare,
}) => {
  return (
    <div className="toma-razon__firma-manual">
      <div className="header">
        <h2>Firma manual</h2>
      </div>
      <div className="content">
        <ol className="custom-list-devolver-pagare">
          <li>
            Firme manualmente la devolción de pagaré que acaba de descargarse
            automáticamente a través de su navegador.
          </li>
          <li>
            Escaneela y súbala haciendo clic en el botón
            <b className="ml-1">Subir devolución de pagaré</b>.
          </li>
          <li>
            Una vez subida nuestros analistas darán validez a la misma lo antes
            posible. Podrá ver el estado navegando hasta la página de detalle en
            la que se encuentra actualmente.
          </li>
          <li className="skip">
            <label
              className="g-button g-button-primary-contained"
              htmlFor="firma-razon__upload-button"
            >
              Subir devolución de pagaré
            </label>
            <input
              type="file"
              name="firma-razon__upload-button"
              id="firma-razon__upload-button"
              onChange={(e) => {
                const files = Array.from(e?.target?.files);
                uploadDevolverPagare(files);
              }}
              className={`inputfile ${
                !devolucionPagareId && 'p-disabled'
              } inputFirmaManual`}
              disabled={!devolucionPagareId}
            />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default FirmaManualDevolverPagare;
