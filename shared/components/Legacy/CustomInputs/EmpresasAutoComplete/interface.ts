import { FocusEvent } from 'react';

import { IEmpresas } from '@shared/interfaces';

export interface IEmpresasAutoComplete {
  checkIfNewRequestNeeded?: boolean;
  currentLibradorCif?: string;
  disabled?: boolean;
  empresasFormInfocif?: boolean;
  environment?: string;
  error?: string | boolean;
  grupoEmpresas?: boolean;
  name: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: string) => void;
  onSelect?: (arg: IEmpresas) => void;
  placeholder?: string;
  setCheckIfNewRequestNeeded?: (e: boolean) => void;
  setValue: (e: string) => void;
  value: string;
  valueName: string;
  valueToSet: string;
}
