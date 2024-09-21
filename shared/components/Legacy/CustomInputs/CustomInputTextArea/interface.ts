import { FocusEventHandler } from 'react';
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions';

export interface ICustomInputTextArea {
  value: string;
  onChange: (arg: string) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  className?: string;
  isDisabled?: boolean;
  name?: string;
  error?: string | boolean;
  autoResize?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  rows?: number;
  cols?: number;
}
