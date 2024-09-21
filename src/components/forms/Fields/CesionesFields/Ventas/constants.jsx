import { nanoid } from 'nanoid';

import { wildcardEnum } from '@shared/components/Legacy/WildcardFields';

export const fields = [
  {
    id: nanoid(),
    className: 'col-span-3',
    type: +wildcardEnum.CURRENCY,
    config: {
      inputName: 'importe',
      inputLabel: 'Ventas anuales estimadas',
      required: true,
    },
  },
];
