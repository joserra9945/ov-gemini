import { faFiles } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Tooltip';
import { IEfectoByGestionFiltersGet } from '@shared/interfaces/api/IEfecto';

type CargaMasivaProps = {
  efecto: IEfectoByGestionFiltersGet;
  efectoCargaMasiva: (efectoNumero: IEfectoByGestionFiltersGet) => void;
};
const CargaMasivaTemplate = ({
  efecto,
  efectoCargaMasiva,
}: CargaMasivaProps) => {
  return (
    <Tooltip content={efecto.numero}>
      <div className="ellipsis">
        <span
          role="button"
          className="text-info ellipsis"
          tabIndex={0}
          onClick={() => efectoCargaMasiva(efecto)}
        >
          <FontAwesomeIcon icon={faFiles} />
          <span className="ml-1">{efecto.numero}</span>
        </span>
      </div>
    </Tooltip>
  );
};

export default CargaMasivaTemplate;
