import { AutoCompleteSelectEvent } from 'primereact/autocomplete';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IElkSearchInput {
  value: string;
  name: string;
  onChange: (e: string) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSelect: (e: AutoCompleteSelectEvent) => void;
  placeholder?: string;
  error?: string | boolean;
  disabled?: boolean;
  type?: number;
}
