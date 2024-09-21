import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';

import { IGenericInput } from '@shared/interfaces/common/Form';

import InputRadio from './InputRadio';

export const standardOptions = [
  {
    value: 1,
    labelOption: 'Sí',
  },
  {
    value: 2,
    labelOption: 'No',
  },
];

const RadioList = ({
  className,
  defaultValue,
  isDisabled = false,
  isHorizontal = false,
  items = standardOptions,
  name,
  inputLabel = name,
  onChange,
  required = false,
  selectedOption,
}: IGenericInput): JSX.Element => {
  const { control } = useForm();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selectedOption != null) {
      setSelected(selectedOption);
    }
  }, [selectedOption]);

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => {
        const { value } = field;
        return (
          <div className={className ?? `w-100 ${isHorizontal ? '' : 'flex'}`}>
            {items?.length
              ? items.map((item: any) => {
                  return (
                    <InputRadio
                      className={className}
                      isDisabled={isDisabled}
                      {...item}
                      key={nanoid()}
                      name={name}
                      value={item.value}
                      onChange={onChange}
                      selected={selected === item.value}
                      selectedOption={value}
                      setSelected={setSelected}
                    />
                  );
                })
              : ''}
          </div>
        );
      }}
      rules={
        !isDisabled
          ? {
              required: {
                value: required,
                message: `El campo ${inputLabel} es obligatorio`,
              },
            }
          : {}
      }
    />
  );
};

export default RadioList;
