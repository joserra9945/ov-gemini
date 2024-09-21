import { IOnRowFunctionalComponent } from '@shared/templates/interfaces';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const EstadoDevolucionPagare = ({
  rowData,
}: IOnRowFunctionalComponent): JSX.Element => {
  return (
    <div className="estado-operacion__container">
      <Tooltip
        content={rowData.estado.description}
        classNameTrigger={`ellipsis estado-tooltip estado-devolucionDePagare-${rowData.estado.id}`}
      >
        {rowData.estado?.description}
      </Tooltip>
    </div>
  );
};

export default EstadoDevolucionPagare;
