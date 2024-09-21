import { Tooltip } from '@shared/components/Tooltip';
import { IEnum } from '@shared/interfaces/IEnum';
import { ESTADO_CARGO_REPRESENTANTE_ENUM } from '@shared/utils/constants';

interface EstadoRepresentanteCargoTemplateProps {
  estado: IEnum;
}

const EstadoRepresentanteCargoTemplate = ({
  estado,
}: EstadoRepresentanteCargoTemplateProps) => {
  let borderColor;
  let textColor;

  switch (estado.id) {
    case ESTADO_CARGO_REPRESENTANTE_ENUM.PENDIENTE_ESCRITURAS:
      borderColor = 'bg-warning bg-opacity-10';
      textColor = 'text-warning';
      break;
    case ESTADO_CARGO_REPRESENTANTE_ENUM.REVISION:
      borderColor = 'bg-[#0069aa] bg-opacity-10';
      textColor = 'text-[#0069aa]';
      break;
    case ESTADO_CARGO_REPRESENTANTE_ENUM.VALIDADO:
      borderColor = 'bg-success bg-opacity-10';
      textColor = 'text-success';
      break;
    case ESTADO_CARGO_REPRESENTANTE_ENUM.RECHAZADO:
      borderColor = 'bg-danger bg-opacity-10';
      textColor = 'text-danger';
      break;
    default:
      return null;
  }

  return (
    <Tooltip content={estado.description}>
      <div
        className={`rounded-[6px] px-[10px] py-[5px] font-semibold text-sm text-center block ${borderColor} block overflow-hidden whitespace-no-wrap overflow-ellipsis`}
      >
        <span
          className={`font-semibold text-sm font-roboto ${textColor} block overflow-hidden whitespace-no-wrap overflow-ellipsis`}
        >
          {estado.description}
        </span>
      </div>
    </Tooltip>
  );
};

export default EstadoRepresentanteCargoTemplate;
