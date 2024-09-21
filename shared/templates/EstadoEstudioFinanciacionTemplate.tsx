import { Tooltip } from '@shared/components/Tooltip';
import { estadosEstudioFinanciacion } from '@shared/enum/enumEstadoEstudioFinanciacion';
import { IEnum } from '@shared/interfaces/IEnum';

const EstadoEstudioFinanciacionTemplate = ({ id, description }: IEnum) => {
  let borderColor;
  let textColor;

  switch (id) {
    case estadosEstudioFinanciacion.PENDIENTE:
      borderColor = 'bg-warning bg-opacity-10 ';
      textColor = 'text-warning';
      break;
    case estadosEstudioFinanciacion.APROBADO:
      borderColor = 'bg-success bg-opacity-10 ';
      textColor = 'text-success';

      break;
    case estadosEstudioFinanciacion.DENEGADO:
      borderColor = 'bg-[#ff6347] bg-opacity-10 ';
      textColor = 'text-[#ff6347]';
      break;
    case estadosEstudioFinanciacion.PERDIDO:
      borderColor = 'bg-danger bg-opacity-10 ';
      textColor = 'text-danger';
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

export default EstadoEstudioFinanciacionTemplate;
