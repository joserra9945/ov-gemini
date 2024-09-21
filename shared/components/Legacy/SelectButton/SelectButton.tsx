import { SelectButton as SelectButtonComponent } from 'primereact/selectbutton';

// eslint-disable-next-line import/no-cycle
import { SelectButtonWrapperProps } from '.';

const SelectButton = ({
  value,
  optionValue,
  optionLabel,
  options,
  onChange,
  className,
  ...rest
}: SelectButtonWrapperProps): JSX.Element => {
  return (
    <div
      className={`select-button__wrapper${className ? ` ${className}` : ''}`}
    >
      <SelectButtonComponent
        value={value}
        optionValue={optionValue}
        optionLabel={optionLabel}
        options={options}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default SelectButton;
