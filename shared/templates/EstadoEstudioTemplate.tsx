import { Tooltip } from '@shared/components/Tooltip';
import { estadosEstudio } from '@shared/enum/enumEstadoEstudio';
import { IEnum } from '@shared/interfaces/IEnum';

const EstadoEstudioTemplate = ({ id, description }: IEnum) => {
  let borderColor;
  let textColor;

  switch (id) {
    case estadosEstudio.PENDIENTE:
      borderColor = 'bg-warning bg-opacity-10 ';
      textColor = 'text-warning';
      break;
    case estadosEstudio.EN_ESTUDIO:
      borderColor = 'bg-success bg-opacity-10 ';
      textColor = 'text-success';

      break;
    case estadosEstudio.CERRADO:
      borderColor = 'bg-[#046bab] bg-opacity-10 ';
      textColor = 'text-[#046bab]';
      break;
    default:
      break;
  }

  return (
    <Tooltip content={description}>
      <div
        className={`rounded-[6px] px-[10px] py-[5px] font-semibold text-sm text-center block ${borderColor} block overflow-hidden whitespace-no-wrap overflow-ellipsis`}
      >
        <span
          className={`font-semibold text-sm font-roboto ${textColor} block overflow-hidden whitespace-no-wrap overflow-ellipsis`}
        >
          {description}
        </span>
      </div>
    </Tooltip>
  );
};

export default EstadoEstudioTemplate;
