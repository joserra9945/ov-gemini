import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';

import { ISelectInput } from '@shared/interfaces/common/Form';

const InputMultiSelect = ({
  name,
  label,
  labelClassName,
  className,
  options,
  required = false,
  optionLabel = 'label',
  optionValue = 'value',
  defaultValue,
  onChange,
  filterOption = false,
  virtualScrollerOptions,
  isMulti = true,
  disabled = false,
  ...rest
}: ISelectInput) => {
  const { control } = useFormContext();

  return (
    <div className="flex-auto w-full">
      <label htmlFor={name} className={labelClassName ?? `font-bold block`}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: {
            value: required,
            message: `El campo ${label} es requerido`,
          },
        }}
        render={({ field }) => {
          return (
            <ReactSelect
              placeholder="Seleccione una opción"
              className={className}
              options={options}
              value={field.value}
              isMulti={isMulti}
              isDisabled={disabled}
              getOptionValue={(option) => `${option[optionValue]}`}
              getOptionLabel={(option) => `${option[optionLabel]}`}
              onChange={(e) => {
                onChange && onChange(e);
                field.onChange(e.value);
              }}
              {...rest}
            />
          );
        }}
      />
    </div>
  );
};
export default InputMultiSelect;
