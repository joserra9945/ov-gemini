import { useRef } from 'react';

import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';
import Notifications from '@shared/utils/notifications';

import { IStringTemplate } from './interfaces';

const StringTemplate = ({
  text,
  className,
  wrapperClassname = 'ellipsis',
}: IStringTemplate) => {
  const divRef = useRef<HTMLDivElement>(null);

  const copiarAlPortapapeles = () => {
    if (divRef.current) {
      navigator.clipboard
        .writeText(divRef.current.innerText)
        .then(() => {
          Notifications.info({ body: 'Copiado en el portapeles' });
        })
        .catch(() => {
          Notifications.info({ body: 'No se pudo copiar al portapapeles' });
        });
    }
  };
  return (
    <GenericTooltip content={text || '-'}>
      {({ target }: ITooltipTarget) => (
        <div ref={divRef} className={`${wrapperClassname}`}>
          <span
            role="button"
            tabIndex={0}
            onClick={() => copiarAlPortapapeles()}
            className={`${target} ${className ?? ''}`}
          >
            {text || '-'}
          </span>
        </div>
      )}
    </GenericTooltip>
  );
};

export default StringTemplate;
