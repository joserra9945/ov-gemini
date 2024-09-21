import { nanoid } from 'nanoid';
import { faCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { enumEstadoDoc } from '@shared/enum/Documento';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

interface Props {
  type: enumEstadoDoc;
  estadoText: string;
  estadoDescription?: string;
  className?: string;
}

const EstadoDocumentoChip = ({
  type,
  className,
  estadoText,
  estadoDescription,
}: Props) => {
  const id = nanoid();
  const getDefaultClasses = () => {
    let response = '';
    switch (type) {
      case enumEstadoDoc.PENDIENTE:
        response = 'text-warning bg-warning-10';
        break;
      case enumEstadoDoc.VALIDADO:
        response = 'text-success bg-success-10';
        break;
      case enumEstadoDoc.RECHAZADO:
        response = 'text-danger bg-danger-10';
        break;
      case enumEstadoDoc.CERRADO:
        response = 'text-warning bg-warning-10';
        break;
      default:
        break;
    }
    return response;
  };
  return (
    <Tooltip content={estadoDescription ?? estadoText ?? ''}>
      <div
        id={id}
        className={` ellipsis rounded-md px-3 py-2 font-bold text-sm ${getDefaultClasses()} ${className}`}
      >
        <div className="flex flex-row items-center justify-center gap-1">
          {estadoText || 'Sin estado'}
          {estadoDescription && <FontAwesomeIcon icon={faCircleInfo} />}
        </div>
      </div>
    </Tooltip>
  );
};

export default EstadoDocumentoChip;
