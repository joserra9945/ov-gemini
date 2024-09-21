import { nanoid } from 'nanoid';

import { wildcardEnum } from '@shared/components/Legacy/WildcardFields';

export const fields = [
  {
    id: nanoid(),
    type: +wildcardEnum.TEXT_AREA,
    config: {
      inputName: 'descripcion',
      inputLabel: 'Descripción',
      required: true,
      autoResize: true,
    },
  },
];
