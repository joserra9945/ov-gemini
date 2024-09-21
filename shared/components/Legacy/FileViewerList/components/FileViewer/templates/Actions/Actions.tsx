import { isNull } from 'lodash';
import { faEye, faTrashCan } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Legacy/Button';

import { IActions } from './Interface';

const Actions = ({ onRemove, onShow }: IActions): JSX.Element => {
  return (
    <div className="g-flex g-flex--items-center file-viewer__right file-viewer__actions-button">
      {!isNull(onShow) && (
        <Button
          className="file-viewer__actions-button--show"
          onClick={onShow}
          tooltipText="Visualizar documento"
          icon={faEye}
        />
      )}
      {!isNull(onRemove) && (
        <Button
          className="file-viewer__actions-button--remove"
          onClick={onRemove}
          tooltipText="Eliminar"
          icon={faTrashCan}
        />
      )}
    </div>
  );
};

export default Actions;
