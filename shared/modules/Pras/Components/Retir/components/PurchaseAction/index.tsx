import { Button } from '@shared/components/Legacy/Button';

type RetirPurchaseActionProps = {
  onClick: () => void;
};

const RetirPurchaseAction = ({
  onClick,
}: RetirPurchaseActionProps): JSX.Element => {
  return (
    <div className="horizontal-divider flex flex-row justify-between w-100 p-3">
      <div className="retir-purchase-title flex items-center">
        FECHAS ÚLTIMA COMPRA
      </div>
      <Button
        className="retir-purchase-button"
        size="sm"
        label="Comprar"
        onClick={onClick}
      />
    </div>
  );
};

export default RetirPurchaseAction;
