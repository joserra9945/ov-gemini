import { IField } from '@shared/forms';
import { IEnum } from '@shared/interfaces/IEnum';

export const newDirectLendingFields = (
  meses: IEnum[],
  concepto: IEnum[],
  config: string
): IField[] => [
  {
    label: `Importe del ${config}`,
    name: 'importe',
    type: 'number',
    placeholder: 'Importe a solicitar',
    className: 'col-span-8 md:col-span-4 mb-2',
    inputClassName: 'w-100',
    locale: 'es-ES',
    mode: 'currency',
    currency: 'EUR',
  },
  {
    label: 'Plazo en meses',
    name: 'plazo',
    type: 'select',
    options: meses,
    optionLabel: 'id',
    optionValue: 'id',
    placeholder: 'Seleccione plazo',
    className: 'col-span-8 md:col-span-4',
    inputClassName: 'w-100',
  },
  {
    label: 'Concepto',
    name: 'concepto',
    type: 'select',
    options: concepto,
    optionLabel: 'description',
    optionValue: 'id',
    placeholder: 'Seleccione un concepto',
    className: 'col-span-8 md:col-span-8',
    inputClassName: 'w-100',
  },
];
