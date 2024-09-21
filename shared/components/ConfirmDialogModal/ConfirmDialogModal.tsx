import { ReactNode } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModalButtons from '../Modal/ModalButtons';
import { Spinner } from '../Spinner';

interface DialogConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string | ReactNode;
  bodyText?: string | ReactNode;
  onDeny?: () => void;
  onConfirm: () => void;
  colorConfirm?: string;
  colorCancel?: string;
  labelConfirm?: string;
  labelCancel?: string;
  className?: string;
  headerClassNameTitle?: string;
  isLoading?: boolean;
  draggable?: boolean;
  headerClassName?: string;
  colorIconHeader?: string;
  iconHeader?: IconProp;
  closable?: boolean;
}

export const ConfirmDialogModal = ({
  isOpen,
  onClose,
  header = '¡ATENCIÓN!',
  bodyText,
  onDeny,
  onConfirm,
  colorConfirm = 'primary',
  colorCancel = 'blank',
  colorIconHeader = 'warning',
  labelConfirm = 'Aceptar',
  labelCancel = 'Cancelar',
  className = 'max-w-xs',
  isLoading,
  draggable = false,
  iconHeader = faExclamationTriangle,
  headerClassName = '',
  headerClassNameTitle,
  closable = false,
}: DialogConfirmProps): JSX.Element => {
  const content = (
    <div className="flex flex-col text-center justify-center font-normal items-center">
      <div className="iconHeader flex w-full items-center justify-center">
        <div className="bg-slate-50 rounded-full p-6">
          <div className="bg-blank rounded-full p-3">
            <FontAwesomeIcon
              className={`h-10 w-10 text-${colorIconHeader}`}
              icon={iconHeader}
            />
          </div>
        </div>
      </div>

      <div className={`${headerClassNameTitle ?? 'font-bold mb-6 mt-6'}`}>
        {header}
      </div>
      {bodyText && <div>{bodyText}</div>}
    </div>
  );

  const footer = (
    <ModalButtons
      onCancel={onDeny}
      onConfirm={onConfirm}
      confirmColor={colorConfirm}
      cancelColor={colorCancel}
      confirmText={labelConfirm}
      cancelText={labelCancel}
      customButtonsClass="mt-2 flex flex-row justify-between w-full"
      maxWidth
    />
  );

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ConfirmDialog
          visible={isOpen}
          className={className}
          onHide={onClose}
          header={content}
          draggable={draggable}
          footer={footer}
          headerClassName={headerClassName}
          closable={closable}
        />
      )}
    </div>
  );
};
