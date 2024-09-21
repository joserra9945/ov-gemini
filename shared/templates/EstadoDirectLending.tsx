import { faCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';
import { ESTADOS_DIRECTLENDING_ENUM } from '@shared/enum/enumEstadosDirectLending';

type EstadoDirectLendingProps = {
  descripcionEstado?: string;
  id: number;
  description: string;
  resumenDirectLending?: boolean;
};

const EstadoDirectLending = ({
  id,
  description,
  descripcionEstado,
  resumenDirectLending,
}: EstadoDirectLendingProps) => {
  const changeColor = (estadoId: number) => {
    switch (estadoId) {
      case ESTADOS_DIRECTLENDING_ENUM.EN_REVISION:
      case ESTADOS_DIRECTLENDING_ENUM.PRECONCEDIDO:
      case ESTADOS_DIRECTLENDING_ENUM.APROBADO:
        return 'text-[#0069aa] bg-[#0069aa] bg-opacity-10';
      case ESTADOS_DIRECTLENDING_ENUM.FIRMA_SOLICITADA:
      case ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_FIRMA:
      case ESTADOS_DIRECTLENDING_ENUM.FIRMADO:
      case ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_PAGO:
        return 'text-warning bg-warning-10';
      case ESTADOS_DIRECTLENDING_ENUM.CONCEDIDO:
      case ESTADOS_DIRECTLENDING_ENUM.PARCIALMENTE_PAGADO:
      case ESTADOS_DIRECTLENDING_ENUM.PAGADO:
        return 'text-success bg-success-10';
      case ESTADOS_DIRECTLENDING_ENUM.CONTRATO_NO_ENVIADO:
      case ESTADOS_DIRECTLENDING_ENUM.DENEGADO:
        return 'text-danger  bg-danger-10';
      case ESTADOS_DIRECTLENDING_ENUM.GENERANDO_CONTRATO:
        return 'text-[#787878] bg-[#787878] bg-opacity-10';
      default:
        return '';
    }
  };

  return (
    <GenericTooltip content={description}>
      {({ target: targetDescription }: ITooltipTarget) => (
        <span
          className={`${targetDescription} w-auto rounded-md py-[5px] px-[10px] font-semibold text-sm text-center ${changeColor(
            id
          )}`}
        >
          {`${description} `}
          {id === ESTADOS_DIRECTLENDING_ENUM.DENEGADO &&
            descripcionEstado &&
            !resumenDirectLending && (
              <GenericTooltip content={`Motivo: ${descripcionEstado}`}>
                {({ target: targetIcon }: ITooltipTarget) => (
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className={`${targetIcon} ml-1`}
                  />
                )}
              </GenericTooltip>
            )}
        </span>
      )}
    </GenericTooltip>
  );
};

export default EstadoDirectLending;
