import { MouseEventHandler } from 'react';
import {
  faCheck,
  faXmark,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';

import Button, { ButtonProps } from '../Button/Button';

type ModalButtonProps = {
  cancelColor?: string;
  cancelIcon?: IconDefinition;
  cancelText?: string;
  cancelType?: 'button' | 'icon-button' | 'text-button';
  confirmColor?: string;
  confirmIcon?: IconDefinition;
  confirmText?: string;
  confirmType?: 'button' | 'icon-button' | 'text-button';
  customButtons?: ButtonProps[];
  customButtonsClass?: string;
  cancelClassName?: string;
  confirmClassName?: string;
  loading?: boolean;
  maxWidth?: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};
const ModalButtons = ({
  cancelColor = 'primary',
  cancelIcon = faXmark,
  cancelText = 'Cancelar',
  cancelType = 'text-button',
  cancelClassName = '',
  confirmClassName = '',
  confirmColor = 'primary',
  confirmIcon = faCheck,
  confirmText = 'Confirmar',
  confirmType = 'button',
  customButtons,
  customButtonsClass,
  loading = false,
  disabled = false,
  maxWidth,
  onCancel,
  onConfirm,
}: ModalButtonProps) => {
  return (
    <div className={customButtonsClass ?? 'mt-4 flex gap-x-4 justify-end'}>
      {customButtons?.map((button) => (
        <Button
          onClick={button.onClick}
          text={button.text}
          type={button.type}
          className={button.className}
          color={button.color}
          disabled={button.disabled}
        />
      ))}
      <Button
        color={cancelColor}
        icon={cancelIcon}
        maxWidth={maxWidth}
        onClick={(e) => {
          e.preventDefault();
          onCancel?.(e);
        }}
        text={cancelText}
        type={cancelType}
        className={cancelClassName || undefined}
      />
      <Button
        color={confirmColor}
        icon={confirmIcon}
        loading={loading}
        disabled={disabled}
        maxWidth={maxWidth}
        onClick={onConfirm}
        text={confirmText}
        type={confirmType}
        className={confirmClassName || undefined}
      />
    </div>
  );
};

export default ModalButtons;
