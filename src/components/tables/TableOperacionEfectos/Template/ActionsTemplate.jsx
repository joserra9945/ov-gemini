import React from 'react';
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Legacy/Button';

import { tabMenuItemsEnum } from 'components/DetalleEfecto/constants';

const ActionsTemplate = (efecto, goToDetalle) => {
  return (
    <div className="actions-table">
      <Button
        data-id="efecto-detalle-btn"
        onClick={(event) =>
          goToDetalle(event, efecto, tabMenuItemsEnum.DATOS_EFECTO)
        }
        className="efectos-action-button"
        icon={faFileAlt}
        color="light"
        tooltipText="Ver detalles"
      />
    </div>
  );
};
export default ActionsTemplate;
