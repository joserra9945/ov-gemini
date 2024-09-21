import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';
import { enumEstadosFinanciacion } from '@shared/enum/enumEstadosFinanciacion';
import { IEnum } from '@shared/interfaces/IEnum';

const EstadoFinanciacionCesionTemplate = ({ id, description }: IEnum) => {
  let borderColor = '';
  let textColor = '';

  switch (id) {
    case enumEstadosFinanciacion.PENDIENTE:
      borderColor = 'bg-[#ff961c] bg-opacity-10 ';
      textColor = 'text-[#ff961c]';
      break;
    case enumEstadosFinanciacion.APROBADA:
      borderColor = 'bg-[#3CAD3C] bg-opacity-10 ';
      textColor = 'text-[#3CAD3C]';

      break;
    case enumEstadosFinanciacion.DENEGADA:
      borderColor = 'bg-[#c50000] bg-opacity-10 ';
      textColor = 'text-[#c50000]';
      break;
    default:
      break;
  }

  return (
    <GenericTooltip content={description}>
      {({ target }: ITooltipTarget) => (
        <span
          className={`${target} rounded-[6px] px-[10px] py-[5px] font-semibold text-sm font-roboto ${borderColor} ${textColor} truncate`}
        >
          {description}
        </span>
      )}
    </GenericTooltip>
  );
};

export default EstadoFinanciacionCesionTemplate;
