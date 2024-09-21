/* eslint-disable @typescript-eslint/no-explicit-any */

import { AutoCompleteSelectEvent } from 'primereact/autocomplete';

export interface IOption {
  id: number;
  descripcion: string;
}

export interface IElkSearchInputIndustriaCnae {
  value: string;
  name: string;
  onChange: (e: string) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSelect: (e: AutoCompleteSelectEvent) => void;
  placeholder?: string;
  error?: string | boolean;
  disabled?: boolean;
  type?: number;
  setCnaeOpts?: React.Dispatch<React.SetStateAction<IOption[]>>;
  setIndustriaOpts?: React.Dispatch<React.SetStateAction<IOption[]>>;
}
