/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface IWildcardFields {
  data?: any;
  rhForm: UseFormReturn<FieldValues>;
  isDisabled?: boolean;
}
