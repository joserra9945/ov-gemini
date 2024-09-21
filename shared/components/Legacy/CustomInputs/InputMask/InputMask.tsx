/* eslint-disable */
// @ts-nocheck

import { InputMask } from 'primereact/inputmask';
import classNames from 'classnames/bind';

import { IInputMaskProps } from './Interface';

const CInputMask = ({
  value,
  mask = '',
  onChange,
  onBlur,
  name,
  error,
  placeholder = '',
  autoClear = false,
  unmask = false,
  slotChar = '-',
  isDisabled = false,
  className,
}: IInputMaskProps): JSX.Element => {
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });
  return (
    <InputMask
      mask={mask}
      className={`${className ? `${className} ` : ''}${inputClass}`}
      id={name}
      value={value}
      name={name}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={(e) => onChange(e.value)}
      autoClear={autoClear}
      unmask={unmask}
      disabled={isDisabled}
      slotChar={slotChar}
    />
  );
};

export default CInputMask;
