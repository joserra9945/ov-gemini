import { IRetirLastPurshase } from '@shared/modules/Pras/interfaces';

type RetirPurchaseInfoProps = {
  lastPurshase: IRetirLastPurshase;
};

const RetirPurchaseInfo = ({
  lastPurshase,
}: RetirPurchaseInfoProps): JSX.Element => {
  const { fechaCompra, fechaUltimaActualizacion, usuario, error } =
    lastPurshase;

  return (
    <div className="flex flex-row justify-between p-3 w-100 horizontal-divider">
      {error && (
        <span>
          No se ha podido obtener los datos de la última compra. Inténtelo de
          nuevo.
        </span>
      )}
      {!error && !fechaCompra && (
        <span>
          Todavía no se ha realizado ninguna compra para esta empresa.
        </span>
      )}
      {!error && fechaCompra && (
        <>
          <div className="flex">
            {`Fecha compra: `}
            <div className="retir-purchase-detail mx-2">
              {`${fechaCompra} ${usuario ? '-' : ''} ${usuario}`}
            </div>
          </div>
          <div className="flex">
            {`Fecha actualización de los datos: `}
            <div className="retir-purchase-detail ml-2 ">
              {fechaUltimaActualizacion}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RetirPurchaseInfo;
