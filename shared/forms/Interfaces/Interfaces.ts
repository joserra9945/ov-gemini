import { MouseEventHandler } from 'react';
import { Control, UseFormReturn } from 'react-hook-form';
import { DefaultInputComponentProps } from 'react-phone-number-input';
import { AutoCompleteProps } from 'primereact/autocomplete';
import { CalendarProps } from 'primereact/calendar';
import { CheckboxProps } from 'primereact/checkbox';
import { InputTextProps } from 'primereact/inputtext';

import { ButtonType } from '@shared/components/GenericButton/GenericButton';

import { DropdownProps } from '@shared/components/Legacy/Dropdown/interfaces';

export interface ISuggestion {
  label: string;
  value: string;
}

export interface IAction {
  label?: string;
  className?: string;
  hidden?: boolean;
  buttonType?: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ICustomOptionDescription {
  id: string;
  description: string;
}

export interface ICustomOptionLabel {
  label: string;
  value: string;
}

export interface IOption {
  description: string;
  id: number | string;
}

export type IField =
  | AutoCompleteProps
  | CalendarProps
  | CheckboxProps
  | DropdownProps
  | DefaultInputComponentProps
  | InputTextProps;

export type TurboFormRh = UseFormReturn<any, any>;

export type TurboFormControl = Control<
  {
    [key: string]: any;
    notarioLocalId?: string | undefined;
    tipo: number;
    fechaPrevista: Date | null;
    administradorApoderador: string;
    notarioId: string;
    representantes: {
      label?: string | undefined;
      value: string;
    }[];
    email: string;
    telefono: string;
  },
  any
>;
