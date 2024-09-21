import { nanoid } from 'nanoid';

import { wildcardEnum } from '@shared/components/Legacy/WildcardFields';

export const billFields = [
  {
    id: nanoid(),
    className: 'col-span-6',
    config: {
      inputName: 'libradoCif',
      inputLabel: 'NIF/CIF de su cliente',
      required: true,
      className: 'libradoCif disabled',
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6',
    config: {
      inputName: 'libradoRazonSocial',
      inputLabel: 'Razón social de su cliente',
      required: true,
      className: 'libradoRazonSocial disabled',
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6',
    config: {
      inputName: 'numero',
      inputLabel: 'Número de factura',
      required: true,
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6',
    type: +wildcardEnum.CURRENCY,
    config: {
      inputName: 'importeNominal',
      inputLabel: 'Importe de la factura',
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6',
    type: +wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaEmision',
      inputLabel: 'Fecha de emisión',
      maxDate: new Date(),
    },
  },
];
