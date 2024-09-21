import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface IWildcardFieldsProps {
  rhForm: UseFormReturn<FieldValues>;
  fields: any;
  data?: any;
  setData?: any;
  requireds?: boolean | string[];
  disableds?: boolean | string[];
}
