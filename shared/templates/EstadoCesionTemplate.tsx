import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';
import { estadoCesionEnum } from '@shared/enum/estadoCesionEnum';
import { IEnum } from '@shared/interfaces/IEnum';

const EstadoCesionTemplate = ({ estado }: { estado: IEnum }) => {
  const { description, id } = estado;

  let borderColor = '';
  let textColor = '';

  switch (id) {
    case estadoCesionEnum.PENDIENTE_COMUNICAR:
      borderColor = 'bg-[#ff961c] bg-opacity-10 ';
      textColor = 'text-[#ff961c]';
      break;

    case estadoCesionEnum.COMUNICADA:
      borderColor = 'bg-[#004ad1] bg-opacity-10 ';
      textColor = 'text-[#004ad1]';
      break;

    case estadoCesionEnum.ACEPTADA_MANUALMENTE:
    case estadoCesionEnum.ACEPTADA:
      borderColor = 'bg-[#0069aa] bg-opacity-10 ';
      textColor = 'text-[#0069aa]';
      break;

    case estadoCesionEnum.CANCELADA:
      borderColor = 'bg-[#e40139] bg-opacity-10 ';
      textColor = 'text-[#e40139]';
      break;

    case estadoCesionEnum.FINALIZADA:
      borderColor = 'bg-[#3cad3c] bg-opacity-10 ';
      textColor = 'text-[#3cad3c]';
      break;

    case estadoCesionEnum.RECHAZADA:
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

export default EstadoCesionTemplate;
