import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { IRadioListProps } from './Interfaces';
import Radio from './Radio';

const RadioList = ({
  name,
  items,
  selectedOption,
  onChange,
  col = '12',
  isDisabled = false,
  defaultValue,
}: IRadioListProps): JSX.Element => {
  const [selected, setSelected] = useState(defaultValue ?? null);

  useEffect(() => {
    if (selectedOption != null) {
      setSelected(selectedOption);
    }
  }, [selectedOption]);

  return (
    <div className="radiobutton-component">
      <div className="grid gap-4 grid-cols-12 mobile:grid-cols-4">
        {items?.length
          ? items.map((item) => (
              <Radio
                key={nanoid()}
                {...item}
                name={name}
                onChange={onChange}
                selected={selected}
                col={col}
                isDisabled={isDisabled}
              />
            ))
          : ''}
      </div>
    </div>
  );
};

export default RadioList;
