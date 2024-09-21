import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { EstadoDocumentoChip } from '@shared/components/EstadoDocumentoChip';
import { enumEstadoDoc } from '@shared/enum/Documento';

export const itemTemplate = (data: {
  label: string;
  estadoText: string;
  estadoType: enumEstadoDoc;
  onClick: () => void;
  icon: IconDefinition;
}): JSX.Element => {
  return (
    <button
      type="button"
      className="flex w-full gap-4 item-center"
      onClick={data.onClick && data.onClick}
    >
      <div className="flex mobile:flex-col mobile:gap-1 w-full">
        <div className="flex w-full text-info items-center self-center text-start">
          <p className="line-clamp-2 w-full" title={data.label}>
            {data.label}
          </p>
        </div>
        <div>
          <EstadoDocumentoChip
            type={data.estadoType}
            estadoText={data.estadoText}
          />
        </div>
      </div>
      <div className="flex items-center self-center mobile:h-full">
        <FontAwesomeIcon className="w-5 h-5" icon={data.icon} />
      </div>
    </button>
  );
};
