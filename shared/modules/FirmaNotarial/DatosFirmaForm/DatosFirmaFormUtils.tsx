import {
  IAction,
  ICustomOptionDescription,
  ICustomOptionLabel,
  IField,
} from '@shared/forms/Interfaces/Interfaces';
import { IEnum } from '@shared/interfaces/IEnum';
import { tipoFirmasEnum } from '@shared/utils/constants';

interface firmNotarialFormFieldsBuilderProps {
  representantes: ICustomOptionLabel[];
  tiposFirmaNotarial: IEnum[];
  apoderados: ICustomOptionDescription[];
  notariosLocales: ICustomOptionDescription[];
  notariosProvincia: ICustomOptionDescription[];
  tipoFirma?: number;
  isAdUser?: boolean;
  canEdit?: boolean;
}

interface firmNotarialFormActionsBuilderProps {
  handleClickGoTo: any;
  showFirmaNotarialButton?: boolean;
  canEdit?: boolean;
}

export const firmNotarialFormFieldsBuilder = ({
  representantes = [],
  tiposFirmaNotarial = [],
  apoderados = [],
  notariosLocales = [],
  notariosProvincia = [],
  tipoFirma,
  isAdUser,
  canEdit,
}: firmNotarialFormFieldsBuilderProps): IField[] => [
  {
    label: 'Tipo',
    name: 'tipo',
    type: 'select',
    options: tiposFirmaNotarial,
    optionLabel: 'description',
    optionValue: 'id',
    placeholder: 'Seleccione una opción',
    className: 'col-span-8 md:col-span-2',
    inputClassName: 'w-100',
    disabled: !canEdit,
  },
  {
    label: 'Fecha Prevista',
    name: 'fechaPrevista',
    type: 'calendar',
    dateFormat: 'dd/mm/yy',
    showIco: true,
    locale: 'es',
    placeholder: 'dd/mm/aaaa',
    className: 'col-span-8 md:col-span-2',
    inputClassName: 'w-100',
    disabled: !canEdit,
    showTime: true,
    hourFormat: '24',
  },
  {
    label: 'Administrador / Apoderador',
    name: 'administradorApoderador',
    type: 'select',
    options: apoderados,
    optionLabel: 'description',
    optionValue: 'id',
    placeholder: 'Seleccione una opción',
    className: 'col-span-8 md:col-span-4',
    inputClassName: 'w-100',
    disabled: !canEdit,
    hidden: !isAdUser,
  },
  {
    label: 'Notaría (Local)',
    name: 'notarioLocalId',
    type: 'select',
    options: notariosLocales,
    optionLabel: 'description',
    optionValue: 'id',
    placeholder: 'Seleccione una opción',
    className: 'col-span-8',
    inputClassName: 'w-100',
    disabled: !canEdit,
    hidden: !isAdUser || tipoFirma === tipoFirmasEnum.COMPLETA,
  },
  {
    label: 'Notaría',
    name: 'notarioId',
    type: 'select',
    options: notariosProvincia,
    optionLabel: 'description',
    optionValue: 'id',
    placeholder: 'Seleccione una opción',
    className: 'col-span-8',
    inputClassName: 'w-100',
    disabled: !canEdit,
  },
  {
    label: 'Firmantes',
    name: 'representantes',
    type: 'autocomplete',
    suggestions: representantes,
    dropdown: true,
    multiple: true,
    optionLabel: 'label',
    placeholder: 'Seleccione una opción',
    className: 'col-span-8',
    inputClassName: 'w-full',
    disabled: !canEdit,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'Escribe tu email',
    className: 'col-span-6 md:col-span-6',
    inputClassName: 'w-100',
    disabled: !canEdit,
  },
  {
    label: 'Teléfono',
    name: 'telefono',
    type: 'phone',
    className: 'col-span-6 md:col-span-2',
    inputClassName: 'w-100',
    disabled: !canEdit,
  },
];

export const firmNotarialFormActionsBuilder = ({
  handleClickGoTo,
  showFirmaNotarialButton,
  canEdit,
}: firmNotarialFormActionsBuilderProps): IAction[] => [
  {
    label: 'Guardar',

    buttonType: 'primary',
    className:
      'w-full md:w-auto h-12 !bg-primary text-white border-primary hover:!border-primary hover:!bg-primary-over flex justify-center',
    hidden: !canEdit,
  },
  {
    label: 'Ir a la ficha notarial',
    buttonType: 'secondary',
    className:
      'w-full md:w-auto min-w-32 h-12 bg-transparent border-primary text-primary hover:!bg-blank-over flex justify-center',
    onClick: (e: any) => {
      e.preventDefault();
      handleClickGoTo();
    },
    hidden: !showFirmaNotarialButton,
  },
];
