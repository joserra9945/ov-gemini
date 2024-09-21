const FirmaManual = ({ tomaRazonId, uploadTomaRazon }) => {
  return (
    <div className="toma-razon__firma-manual">
      <div className="content">
        <ol className="custom-list">
          <li>
            Firme manual o digitalmente la Toma de Razón que acaba de
            descargarse automáticamente a través de su navegador.
          </li>
          <li>
            Escaneela y súbala haciendo clic en el botón
            <b className="ml-1">Subir Toma de Razón</b>.
          </li>
          <li>
            Una vez subida, nuestros analistas darán validez a la misma lo antes
            posible. Podrá ver el estado navegando hasta la página de detalle en
            la que se encuentra actualmente.
          </li>
          <li className="skip">
            <label
              className="g-button g-button-primary-contained"
              htmlFor="firma-razon__upload-button"
            >
              Subir Toma de razón
            </label>
            <input
              type="file"
              name="firma-razon__upload-button"
              id="firma-razon__upload-button"
              onChange={(e) => {
                const files = Array.from(e?.target?.files);
                uploadTomaRazon(files);
              }}
              className={`inputfile ${!tomaRazonId ? 'p-disabled' : ''}`}
              disabled={!tomaRazonId}
            />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default FirmaManual;
