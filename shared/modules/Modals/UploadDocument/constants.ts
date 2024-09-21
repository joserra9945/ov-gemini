/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ITipoDocumento } from '@shared/interfaces';

import { wildcardEnum } from '@shared/components/Legacy/WildcardFields';

export const fields = (tipoDocumento: ITipoDocumento[]) => [
  {
    id: 'tipoDocumento',
    type: wildcardEnum.SELECT_FILTER,
    config: {
      inputName: 'tipoDocumento',
      inputLabel: 'Tipo de documento',
      required: true,
      options: tipoDocumento,
      valueProperty: 'id',
      labelProperty: 'description',
      placeholder: 'Seleccione el tipo de documento',
      menuPosition: 'fixed',
      isClearable: false,
      menuPlacement: 'bottom',
      menuPortalTarget: document.body,
    },
  },
  {
    id: 'files',
    type: wildcardEnum.FILEPOND,
    config: {
      inputName: 'files',
      inputLabel: 'Archivo',
      required: true,
      maxFiles: 1,
    },
  },
];
