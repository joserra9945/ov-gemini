import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';
import { firmaCesionesEnum } from '@shared/enum/firmaCesiones';
import { IEnum } from '@shared/interfaces/IEnum';

const EstadoCesionFirmaTemplate = ({ estado }: { estado: IEnum }) => {
  const { description, id } = estado;

  let borderColor = '';
  let textColor = '';

  switch (id) {
    case firmaCesionesEnum.PENDIENTE_FIRMA_DIGITAL:
    case firmaCesionesEnum.PENDIENTE_FIRMA_ANTE_NOTARIO:
      borderColor = 'bg-[#ff961c] bg-opacity-10 ';
      textColor = 'text-[#ff961c]';
      break;
    case firmaCesionesEnum.FIRMADA_DIGITALMENTE:
    case firmaCesionesEnum.FIRMADA_ANTE_NOTARIO:
    case firmaCesionesEnum.SOLICITUD_FIRMA_CONFIRMADA:
    case firmaCesionesEnum.FINALIZADA:
      borderColor = 'bg-[#30d59b] bg-opacity-10 ';
      textColor = 'text-[#30d59b]';
      break;

    case firmaCesionesEnum.FIRMA_ANTE_NOTARIO_SOLICITADA:
    case firmaCesionesEnum.CONTRADO_GENERADO:
    case firmaCesionesEnum.CONTRATO_ENVIADA_ANTE_NOTARIO:
      borderColor = 'bg-[#0069aa] bg-opacity-10 ';
      textColor = 'text-[#0069aa]';
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

export default EstadoCesionFirmaTemplate;
