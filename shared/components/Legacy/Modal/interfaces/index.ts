export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  showHeader?: boolean;
  title?: string | React.ReactNode;
  showCloseButton?: boolean;
  showFooter?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
  disableAnimation?: boolean;
  data?: unknown;
  draggable?: boolean;
  classNameTitle?: string;
}
