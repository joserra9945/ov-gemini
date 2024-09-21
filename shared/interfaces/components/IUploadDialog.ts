import { FieldValues, UseFormReturn } from 'react-hook-form';

export type IButtonColor =
  | 'primary'
  | 'danger'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'info'
  | 'light';

export interface IUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  bodyText?: string | React.ReactNode;
  onDeny?: () => void;
  onConfirm?: () => void;
  colorConfirm?: IButtonColor;
  colorCancel?: IButtonColor;
  labelConfirm?: string;
  labelCancel?: string;
  children?: React.ReactNode;
  dialogForm?: null | UseFormReturn<FieldValues>;
  closeButtonColor?: IButtonColor;
  closeButtonLinkAppareance?: boolean;
  confirmButtonDisabled?: boolean;
}
