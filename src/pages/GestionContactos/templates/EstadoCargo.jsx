import { useDispatch } from 'react-redux';

import { EstadoRepresentanteCargoTemplate } from '@shared/templates';

import { Button } from '@shared/components/Legacy/Button';

import { addRepresentante } from '../../../store/actions/actions-contact';

import './templates.scss';

const EstadoCargo = (rowData, editPersona) => {
  const dispatch = useDispatch();

  return (
    <div className="estado-wrapper ellipsis">
      {rowData?.esRepresentante ? (
        <EstadoRepresentanteCargoTemplate
          estado={rowData?.representante?.estadoCargo}
        />
      ) : (
        <Button
          label="Crear representante"
          className="p-button-link add-representante"
          disabled={false}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            editPersona(rowData);
            dispatch(addRepresentante(true));
          }}
        />
      )}
    </div>
  );
};

export default EstadoCargo;
