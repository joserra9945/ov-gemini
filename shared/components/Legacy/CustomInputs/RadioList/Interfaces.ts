/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRadioProps {
  id: number;
  value: string;
}

export interface IRadioComponentProps extends IRadioProps {
  key: string;
  name: string;
  selected: any;
  onChange: (arg: any) => void;
  col: string;
  isDisabled?: boolean;
  label?: string;
}

export interface IRadioListProps {
  name: string;
  items: IRadioProps[];
  selectedOption?: any;
  onChange: (arg: any) => void;
  col?: string;
  isDisabled?: boolean;
  error?: string | boolean;
  defaultValue?: number;
}
