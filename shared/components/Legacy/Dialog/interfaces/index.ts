export interface DialogProps {
  /**
   * Boolean used to open dialog
   */
  isOpen: boolean;
  className?: string;
  /**
   * We need to declare this function to close de dialog.
   */
  close: () => void;
  /**
   * Header text
   */
  header?: string | React.ReactNode;
  /**
   * It allows us to maximize the dialog_content
   */
  canMaximize?: boolean;
  children: React.ReactNode;
  clickOutsideToClose?: boolean;
  closeButtonColor?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'light';
  closeButtonLinkAppareance?: boolean;
  footer?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  draggable?: boolean;
  position?:
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'top-left';
  disableAnimation?: boolean;
  tailWindClass?: string;
  tailWindHeader?: string;
}
