import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Tooltip';

import { IGestorOperacionTemplate } from './interfaces';

const GestorOperacionTemplate = ({
  gestor,
  className = '',
  numeroOperacion,
}: IGestorOperacionTemplate) => {
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <Tooltip content={gestor || '-'}>
      <div ref={divRef} className="ellipsis">
        <span
          role="button"
          tabIndex={0}
          onClick={() =>
            navigate('/riesgos/estudios/', {
              state: {
                operacionNumero: numeroOperacion,
              },
            })
          }
          className={className}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          &nbsp;
          {gestor || '-'}
        </span>
      </div>
    </Tooltip>
  );
};

export default GestorOperacionTemplate;
