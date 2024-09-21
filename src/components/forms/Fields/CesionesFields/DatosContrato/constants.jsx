import { wildcardEnum } from '@shared/components/Legacy/WildcardFields';

export const fields = [
  {
    id: 'numero-cesion',
    className: 'col-span-4',
    config: {
      inputName: 'numero',
      inputLabel: 'Número de contrato',
      required: true,
    },
  },
  {
    id: 'fecha-inicio-cesion',
    className: 'col-span-2',
    type: +wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaInicioContrato',
      inputLabel: 'Fecha inicio',
      required: true,
      placeholder: 'DD/MM/YYYY',
    },
  },
  {
    id: 'fecha-fin-cesion',
    className: 'col-span-2',
    type: +wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaFinalizacion',
      inputLabel: 'Fecha fin',
      required: true,
      placeholder: 'DD/MM/YYYY',
    },
  },
  {
    id: 'importe-cesion',
    className: 'col-span-2',
    type: +wildcardEnum.CURRENCY,
    config: {
      inputName: 'importe',
      inputLabel: 'Importe de la cesión',
      required: true,
      min: 1,
    },
  },
  {
    id: 'importe-pendiente-de-ejecutar',
    className: 'col-span-2',
    type: +wildcardEnum.CURRENCY,
    config: {
      inputName: 'importePendienteDeEjecutar',
      inputLabel: 'Imp. a ejecutar',
      required: true,
      min: 1,
    },
  },
  {
    id: 'filepond-cesion',
    type: +wildcardEnum.FILEPOND,
    config: {
      inputName: 'files',
      inputLabel: 'Documento del contrato',
      required: true,
      maxFiles: 1,
    },
  },
];
