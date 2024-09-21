import { faUserEdit } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Legacy/Button';

import './templates.scss';

const ActionsTemplate = (persona, editPersona, toggleDialog) => {
  return (
    <div className="actions-wrapper edit-representante">
      <Button
        color="light"
        tooltipText="Editar"
        icon={faUserEdit}
        className="edit-persona"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editPersona(persona);
        }}
        disabled={persona?.representanteVerificado}
      />
    </div>
  );
};

export default ActionsTemplate;
