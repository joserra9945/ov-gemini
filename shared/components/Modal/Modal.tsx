import { ReactNode } from 'react';
import { Dialog } from 'primereact/dialog';

type ModalProps = {
  children?: ReactNode;
  className?: string;
  contentStyle?: React.CSSProperties;
  header?: string | JSX.Element | null;
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  draggable?: boolean;
  contentClassName?: string;
  headerClassName?: string;
};

const Modal = ({
  children,
  className,
  contentStyle,
  header = null,
  open,
  onClose,
  closable = true,
  draggable,
  contentClassName = '',
  headerClassName = '',
}: ModalProps) => {
  return (
    <Dialog
      className={`${className}`}
      baseZIndex={40}
      contentStyle={contentStyle}
      contentClassName={contentClassName}
      headerClassName={!header && !closable ? 'hidden' : headerClassName}
      draggable={draggable}
      header={header}
      headerStyle={{ color: '#1a2543' }}
      onHide={onClose}
      visible={open}
      closable={closable}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
