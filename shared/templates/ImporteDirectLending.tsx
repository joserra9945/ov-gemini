import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';
import { formatCurrency } from '@shared/utils/formatters';

const ImporteDirectLending = ({
  importe,
  importeAnterior,
}: {
  importe: number;
  importeAnterior?: number;
}) => (
  <GenericTooltip content={formatCurrency(importe)}>
    {({ target }: ITooltipTarget) => (
      <div className="ellipsis">
        <span>
          {importe !== importeAnterior ? (
            <>
              <span className="text-danger line-through">
                {formatCurrency(importeAnterior)}
              </span>
              <span className={`${target} pl-2`}>
                {formatCurrency(importe)}
              </span>
            </>
          ) : (
            <span className={target}>{formatCurrency(importe)}</span>
          )}
        </span>
      </div>
    )}
  </GenericTooltip>
);

export default ImporteDirectLending;
