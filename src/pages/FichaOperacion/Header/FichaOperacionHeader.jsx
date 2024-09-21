import { useLocation, useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@shared/components/Button';
import { EstadoOperacionTemplate } from '@shared/templates';
import { formatCurrency, formatDateCalendar } from '@shared/utils/formatters';

const FichaOperacionHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;

  return (
    <div>
      <div className="flex items-center justify-between m-8">
        <div className="flex items-center text-2xl gap-3">
          <Button
            type="icon-button"
            className="flex bg-transparent text-primary hover:bg-transparent "
            onClick={() => navigate(-1)}
            icon={faArrowLeft}
          />
          <p className="text-xl font-semibold">Ficha de la operación</p>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="ml-24 text-xl font-medium">
            <span>
              {data?.numero} | {formatDateCalendar(data?.fechaValor)} |{' '}
              {data?.producto?.description} |{' '}
              {formatCurrency(data?.importeNominal)}
            </span>
          </div>
          <div className="ml-2">
            {data && (
              <EstadoOperacionTemplate estado={data.estado} isClientView />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaOperacionHeader;
