import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { nanoid } from 'nanoid';

import { IGenericInput } from '@shared/interfaces/common/Form';

const InputRadio = ({
  id,
  isDisabled = false,
  labelOption,
  name,
  onChange,
  selected,
  setSelected,
  value,
}: IGenericInput): JSX.Element => {
  return (
    <div key={nanoid()} className="px-2 flex items-center">
      <RadioButton
        checked={selected}
        className="mb-1"
        disabled={isDisabled}
        inputId={`${id}`}
        name={name}
        onChange={(e: RadioButtonChangeEvent) => {
          setSelected(e.value);
          onChange(e.value);
        }}
        value={value}
      />
      <label className="ml-2" htmlFor={value}>
        {labelOption || value}
      </label>
    </div>
  );
};

export default InputRadio;
