import { Tooltip } from '@shared/components/Tooltip';
import { firmaNotarialEnum } from '@shared/enum/firmaNotarial';
import { IEnum } from '@shared/interfaces/IEnum';

const EstadoFirmaNotarialTemplate = ({ estado }: { estado: IEnum }) => {
  const { description, id } = estado;

  let borderColor;
  let textColor;

  switch (id) {
    case firmaNotarialEnum.SOLICITADA:
    case firmaNotarialEnum.CONFIRMADA:
    case firmaNotarialEnum.DOCUMENTACIO_GENERADA:
      borderColor = 'bg-[#ffa800] bg-opacity-10 ';
      textColor = 'text-warning';
      break;
    case firmaNotarialEnum.ENVIANDO_DOCUMENTACION:
      borderColor = 'bg-info bg-opacity-10 ';
      textColor = 'text-info';
      break;
    case firmaNotarialEnum.ERROR_ENVIANDO_DOCUMENTACION:
      borderColor = 'bg-danger bg-opacity-10 ';
      textColor = 'text-danger';
      break;
    case firmaNotarialEnum.DOCUMENTACION_ENVIADA:
      borderColor = 'bg-success bg-opacity-10 ';
      textColor = 'text-success';
      break;
    case firmaNotarialEnum.FINALIZADA:
      borderColor = 'bg-[#495057] bg-opacity-10 ';
      textColor = 'text-[#495057]';
      break;
    default:
      break;
  }

  return (
    <Tooltip content={description}>
      <div
        className={`rounded-md px-[10px] py-[5px] font-semibold text-sm text-center block ${borderColor} block overflow-hidden whitespace-no-wrap overflow-ellipsis`}
      >
        <span
          className={`font-semibold text-sm font-roboto ${textColor} block overflow-hidden whitespace-no-wrap overflow-ellipsis`}
        >
          {description || ''}
        </span>
      </div>
    </Tooltip>
  );
};

export default EstadoFirmaNotarialTemplate;
