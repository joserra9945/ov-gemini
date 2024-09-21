import { useNavigate } from 'react-router-dom';

import { estadoCuentaBancariaEnum } from '@shared/utils/constants';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const ActionsTemplate = (rowData) => {
  const navigate = useNavigate();

  return (
    <div className="table-actions__container">
      {rowData?.estado?.id !== estadoCuentaBancariaEnum.VALIDADA ? (
        <Tooltip content="Verificar cuenta">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate('/afterbanks', {
                state: {
                  fromCuentas: true,
                  iban: rowData?.iban?.completo,
                },
              });
            }}
            label="Verificar"
            className="h-10 bg-secondary rounded-md text-white px-6 hover:bg-secondary-over"
            data-tip="Verificar cuenta"
          >
            Verificar
          </button>
        </Tooltip>
      ) : (
        ''
      )}
    </div>
  );
};

export default ActionsTemplate;
