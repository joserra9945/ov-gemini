import { DropdownChangeEvent } from 'primereact/dropdown';

export interface IGenericInput {
  name: string;
  className?: string;
  label?: string;
  defaultValue?: any;
  required?: boolean;
  placeholder?: string;
  labelClassName?: string;
  disabled?: boolean;

  [key: string]: any;
}

export interface ISwitchInput extends IGenericInput {
  onChange?: (e: DropdownChangeEvent) => void;
}
export interface ISelectInput extends IGenericInput {
  onChange?: (e: DropdownChangeEvent) => void;
  options: any[];
  filter?: boolean;
}

export interface IFilePondInput extends IGenericInput {
  maxFiles?: number;
  acceptedFileTypes?: string[];
  changeIcon?: boolean;
}

export interface ICurrentInput extends IGenericInput {
  importe?: number;
}

export interface IInputTextArea extends IGenericInput {
  row?: number;
}

export interface IPercentageInput extends IGenericInput {
  maxFractionDigits?: number;
}
export interface ICheckBoxInput extends IGenericInput {
  myValue?: string | number;
}

export interface ICalendar extends IGenericInput {
  maxDate?: Date;
  minDate?: Date;
}
export interface IPasswordInput extends IGenericInput {
  validate: boolean;
}
