import {
  SelectButton as PrimeSelectButton,
  SelectButtonProps,
} from 'primereact/selectbutton';

import './SelectButton.scss';

interface IProps extends SelectButtonProps {
  className?: string;
  typeStyles?: 'primary';
}

const SelectButton = ({
  typeStyles = 'primary',
  className,
  value,
  options,
  onChange,
  ...rest
}: IProps) => {
  return (
    <PrimeSelectButton
      className={`${className} ${'button-'}${typeStyles} flex flex-row gap-2`}
      value={value}
      options={options}
      onChange={(e) => {
        if (e.target.value !== null) onChange?.(e);
      }}
      {...rest}
    />
  );
};

export default SelectButton;
