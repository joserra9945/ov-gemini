import { Tooltip } from '@shared/components/Tooltip';
import { estadosDocumentacionCesionFirma } from '@shared/utils/constants';

interface Props {
  id: number;
  description: string;
}

const EstadoDocumentoCesionFirmaTemplate = ({ id, description }: Props) => {
  let borderColor;
  let textColor;

  switch (id) {
    case estadosDocumentacionCesionFirma.NO_APLICA:
      borderColor = 'bg-[#787878] bg-opacity-10 ';
      textColor = 'text-[#787878]';
      break;
    case estadosDocumentacionCesionFirma.PENDIENTE_FIRMA_DIGITAL:
    case estadosDocumentacionCesionFirma.PENDIENTE_FIRMAR_ANTE_NOTARIO:
      borderColor = 'bg-[#ff961c] bg-opacity-10 ';
      textColor = 'text-[#ff961c]';
      break;
    case estadosDocumentacionCesionFirma.FIRMA_DIGITAL_ENVIADA:
      borderColor = 'bg-[#0069aa] bg-opacity-10 ';
      textColor = 'text-[#0069aa]';
      break;
    case estadosDocumentacionCesionFirma.FIRMADO_DIGITALMENTE:
    case estadosDocumentacionCesionFirma.FIRMADO_ANTE_NOTARIO:
      borderColor = 'bg-[#30d59b] bg-opacity-10 ';
      textColor = 'text-[#30d59b]';
      break;
    case estadosDocumentacionCesionFirma.FIRMA_DIGITAL_CANCELADA:
    case estadosDocumentacionCesionFirma.FIRMA_DIGITAL_RECHAZADA:
      borderColor = 'bg-[#e40139] bg-opacity-10 ';
      textColor = 'text-[#e40139]';
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

export default EstadoDocumentoCesionFirmaTemplate;
