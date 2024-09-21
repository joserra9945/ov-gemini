import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';

import { IRadioComponentProps } from './Interfaces';

const Radio = ({
  value,
  name,
  isDisabled = false,
  onChange,
  id,
  selected,
  col,
  label,
}: IRadioComponentProps): JSX.Element => {
  return (
    <div className={`col-span-${col}`}>
      <div className="p-field-radiobutton">
        <RadioButton
          inputId={`${id}`}
          name={name}
          value={value}
          onChange={(e: RadioButtonChangeEvent) => {
            onChange(e.value);
          }}
          checked={selected === value}
          disabled={isDisabled}
        />
        <label htmlFor={value}> {label || value}</label>
      </div>
    </div>
  );
};

export default Radio;
