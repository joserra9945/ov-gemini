/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentType, FocusEvent } from 'react';
import {
  GroupBase,
  MenuPosition,
  MultiValueGenericProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';

export interface OptionType {
  label: string;
  value: string | number;
  numero?: string | number;
  importeNominal?: string;
  operacionNumero?: string | number;
}

export type GroupType = GroupBase<OptionType>;

export type { GroupBase };

export interface IDropdownFilterProps {
  onChange(e: any): any;
  getOptionLabel?: (args: any) => string;
  formatGroupLabel?: (group: GroupBase<OptionType>) => React.ReactNode;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  setterOnChange?(e: any): any;
  options: any[];
  valueProperty?: string;
  value?: any;
  placeholder?: string;
  name?: string;
  labelProperty?: string;
  customStyles?: any;
  inputClass?: string;
  noOptionsMessageText?: string;
  error?: string | boolean;
  disabled?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  formatOptionLabel?: any;
  formatSingleValue?: ComponentType<
    SingleValueProps<any, boolean, GroupBase<OptionType>>
  >;
  optionTemplate?: ComponentType<
    OptionProps<any, boolean, GroupBase<OptionType>>
  >;
  multiValueLabel?: React.ComponentType<
    MultiValueGenericProps<any, boolean, GroupBase<OptionType>>
  >;
  menuPortalTarget?: HTMLElement | null;
  menuPosition?: MenuPosition;
}
